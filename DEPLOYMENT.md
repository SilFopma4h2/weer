# 🚀 Deployment Guide - Weer App MVP

## Quick Start

### 1. Production Deployment
```bash
# Clone repository
git clone <repository-url>
cd weer

# Install dependencies
pip install -r requirements.txt

# Configure environment (optional)
cp .env.example .env
# Edit .env to customize location settings if needed

# Start production server
uvicorn app:app --host 0.0.0.0 --port 8000
```

### 2. Demo Mode (for testing without API key)
```bash
python demo.py
```

## Environment Configuration

### Optional Environment Variables
- `DEFAULT_LAT`: Default latitude (default: 52.3676 for Amsterdam)
- `DEFAULT_LON`: Default longitude (default: 4.9041 for Amsterdam)
- `CACHE_DURATION`: Cache duration in seconds (default: 600)
- `DEFAULT_LAT`: Default latitude (52.3676 for Amsterdam)  
- `DEFAULT_LON`: Default longitude (4.9041 for Amsterdam)
- `CACHE_DURATION`: Cache duration in seconds (600 = 10 minutes)

## Open-Meteo API

This application uses the free Open-Meteo API (https://open-meteo.com/):
- **No API key required**: Completely free
- **High reliability**: Data from national weather services
- **Global coverage**: Worldwide weather data
- **Real-time updates**: Current weather information

## Performance Verification

Run the included performance tests:
```bash
python test_performance.py
```

Expected results (all requirements met):
- ✅ Frontend Load Time: < 2 seconds
- ✅ API Response Time: ≤ 500ms  
- ✅ Health Endpoint: Working
- ✅ All Endpoints: Responsive

## Production Considerations

### 1. Web Server (Nginx + Gunicorn)
```bash
# Install gunicorn
pip install gunicorn

# Start with gunicorn
gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### 2. Systemd Service
Create `/etc/systemd/system/weer-app.service`:
```ini
[Unit]
Description=Weer App - Weather Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/path/to/weer
Environment=PATH=/path/to/weer/venv/bin
ExecStart=/path/to/weer/venv/bin/gunicorn app:app -w 4 -k uvicorn.workers.UvicornWorker --bind 127.0.0.1:8000
Restart=always

[Install]
WantedBy=multi-user.target
```

### 3. Nginx Configuration
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
    
    location /static {
        alias /path/to/weer/static;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 4. SSL/HTTPS (Let's Encrypt)
```bash
# Install certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal (crontab)
0 12 * * * /usr/bin/certbot renew --quiet
```

## Docker Deployment

### Dockerfile
```dockerfile
FROM python:3.12-slim

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY . .

# Create non-root user
RUN useradd -m -u 1001 weer
USER weer

# Expose port
EXPOSE 8000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8000/health || exit 1

# Start application
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]
```

### docker-compose.yml
```yaml
version: '3.8'

services:
  weer-app:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DEFAULT_LAT=52.3676
      - DEFAULT_LON=4.9041
      - CACHE_DURATION=600
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

## Monitoring & Logging

### 1. Application Metrics
- Health endpoint: `GET /health`
- Response time monitoring
- Cache hit rates
- API quota usage

### 2. Log Format
```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
```

### 3. Prometheus Metrics (Optional)
```bash
pip install prometheus-fastapi-instrumentator
```

## Security Considerations

### 1. API Key Protection
- Never commit API keys to version control
- Use environment variables
- Rotate keys regularly
- Monitor API quota usage

### 2. Rate Limiting
```python
# Add to app.py
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/current")
@limiter.limit("60/minute")
async def get_current_weather(request: Request, ...):
    # ...
```

### 3. CORS Configuration
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["your-domain.com"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)
```

## Scaling & Performance

### 1. Caching Strategy
- API response caching (10 minutes)
- Static file caching (1 year)
- Browser caching headers
- CDN for static assets

### 2. Database (Optional)
For storing historical data:
```python
# Add to requirements.txt
sqlalchemy>=1.4.0
databases[postgresql]>=0.7.0
```

### 3. Load Balancing
Multiple app instances behind load balancer:
```bash
# Multiple gunicorn instances
gunicorn app:app -w 8 -k uvicorn.workers.UvicornWorker
```

## Troubleshooting

### Common Issues

1. **API Key Not Working**
   - Check if key is activated (can take up to 2 hours)
   - Verify API quota limits
   - Check API key format

2. **Slow Performance**
   - Increase cache duration
   - Check internet connection to API
   - Monitor API response times

3. **Static Files Not Loading**
   - Check file permissions
   - Verify static file paths
   - Check web server configuration

### Debug Mode
```bash
# Start with debug logging
PYTHONPATH=. uvicorn app:app --log-level debug --reload
```

### Health Checks
```bash
# Test all endpoints
curl http://localhost:8000/health
curl http://localhost:8000/current
curl http://localhost:8000/forecast
curl http://localhost:8000/alerts
```

## Backup & Recovery

### 1. Application Backup
- Source code in version control
- Environment configuration
- API keys and secrets

### 2. Monitoring
- Uptime monitoring (>= 80% requirement)
- Performance metrics
- Error rate tracking
- API quota monitoring

## Support

For issues and support:
1. Check logs: `journalctl -u weer-app -f`
2. Verify API connectivity: `curl -s "https://api.open-meteo.com/v1/forecast?latitude=52.37&longitude=4.90&current_weather=true"`
3. Test endpoints: `python test_performance.py`
4. Review configuration: Environment variables and file permissions