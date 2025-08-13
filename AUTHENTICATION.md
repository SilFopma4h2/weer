# 🔐 Weather App Authentication System

## Overview

The Weather App now includes a complete user authentication system that allows users to register, login, save their location preferences, and have personalized weather experiences.

## 🌟 Features

### User Authentication
- **Registration**: Create account with email/password and optional location
- **Login**: Secure authentication with session management
- **Logout**: Complete session cleanup
- **Password Security**: bcrypt hashing with validation requirements

### Location Preferences
- **Save Location**: Users can save their preferred location coordinates
- **Auto-Apply**: Saved locations automatically used for weather data
- **Update Settings**: Easy location updates through settings modal

### Security Features
- **Password Requirements**: Minimum 8 characters with letters and numbers
- **Email Validation**: Proper email format checking
- **Session Management**: Secure 30-day HTTP-only cookies
- **SQL Injection Prevention**: Parameterized queries and input sanitization

## 🚀 Usage

### For New Users
1. Click "📝 Registreren" on the homepage
2. Fill in email, password, confirm password, and optionally location
3. Submit to create account and auto-login
4. Weather data will use your saved location (if provided)

### For Existing Users
1. Click "🔑 Inloggen" on the homepage
2. Enter email and password
3. Submit to login
4. Weather data will automatically use your saved location

### Managing Settings
1. When logged in, click "⚙️ Instellingen"
2. Update your location (format: latitude,longitude)
3. Click "Opslaan" to save changes
4. Weather data will immediately use the new location

### Logging Out
1. When logged in, click "🚪 Uitloggen"
2. Session will be cleared and you'll return to anonymous browsing

## 🛠️ Technical Details

### Database Schema

**Users Table:**
- `id`: Primary key (auto-increment)
- `email`: Unique email address
- `password_hash`: bcrypt hashed password
- `location`: Optional coordinates (lat,lon format)
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp

**Sessions Table:**
- `id`: Unique session token
- `user_id`: Foreign key to users table
- `created_at`: Session creation timestamp
- `expires_at`: Session expiration timestamp

### API Endpoints

**Authentication:**
- `GET /`: Homepage (shows auth status)
- `GET /login`: Login page
- `POST /login`: Process login
- `GET /register`: Registration page
- `POST /register`: Process registration
- `POST /logout`: Logout user
- `GET /settings`: User settings page
- `POST /settings`: Update user settings

**Weather (Enhanced):**
- `GET /current`: Current weather (uses user location if logged in)
- `GET /forecast`: Weather forecast (uses user location if logged in)
- `GET /alerts`: Weather alerts (uses user location if logged in)

### Location Format

Locations should be provided in `latitude,longitude` format:
- **Amsterdam**: `52.3676,4.9041`
- **London**: `51.5074,-0.1278`
- **New York**: `40.7128,-74.0060`

### Password Requirements
- Minimum 8 characters
- Must contain at least one letter
- Must contain at least one number

## 🔧 Development

### Database Initialization
The database is automatically initialized when the app starts. To reset:
```bash
rm weather_app.db
python app.py
```

### Testing
Run the authentication tests:
```bash
python test_auth.py
```

Run performance tests:
```bash
python test_performance.py
```

### Dependencies
New dependencies added:
- `bcrypt`: Password hashing
- `python-multipart`: Form data handling

## 🎨 UI Components

The authentication system includes responsive modal components:
- **Login Modal**: Email/password fields with validation
- **Registration Modal**: Email/password/location fields with validation
- **Settings Modal**: Location preference updates
- **User Header**: Shows logged-in state with email and action buttons

All modals are mobile-responsive and include proper error handling and user feedback.