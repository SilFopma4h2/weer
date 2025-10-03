# 📊 Tracking Features Documentation

## Overview

The Weather App now includes comprehensive tracking features that store game moves and location loads in a SQLite database.

## Features

### 1. Game Move Tracking 🎮

Every move made in the 2048 game is automatically tracked and stored in the database.

**Tracked Information:**
- Direction of move (up, down, left, right)
- Score at the time of the move
- User ID (if logged in, otherwise NULL)
- Timestamp of the move

**Database Table:**
```sql
CREATE TABLE game_moves (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    direction TEXT NOT NULL,
    score INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
)
```

### 2. Location Load Tracking 📍

Every time weather data is loaded for a location, the request is tracked in the database.

**Tracked Information:**
- Latitude and longitude coordinates
- Location name (e.g., "Amsterdam", "Rotterdam")
- User ID (if logged in, otherwise NULL)
- Timestamp of the load

**Database Table:**
```sql
CREATE TABLE location_loads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    latitude REAL NOT NULL,
    longitude REAL NOT NULL,
    location_name TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
)
```

## API Endpoints

### Track Game Move
**POST** `/api/track/move`

**Parameters:**
- `direction` (required): Direction of the move (left, right, up, down)
- `score` (optional): Current game score (default: 0)

**Example:**
```javascript
const formData = new FormData();
formData.append('direction', 'left');
formData.append('score', 100);

await fetch('/api/track/move', {
    method: 'POST',
    body: formData
});
```

### Track Location Load
**POST** `/api/track/location`

**Parameters:**
- `latitude` (required): Latitude coordinate
- `longitude` (required): Longitude coordinate
- `location_name` (optional): Human-readable location name

**Example:**
```javascript
const formData = new FormData();
formData.append('latitude', 52.3676);
formData.append('longitude', 4.9041);
formData.append('location_name', 'Amsterdam');

await fetch('/api/track/location', {
    method: 'POST',
    body: formData
});
```

### Get Move Statistics
**GET** `/api/stats/moves`

Returns statistics about game moves.

**Response:**
```json
{
    "stats": {
        "left": 45,
        "right": 38,
        "up": 52,
        "down": 41
    }
}
```

### Get Location Statistics
**GET** `/api/stats/locations`

Returns statistics about location loads.

**Response:**
```json
{
    "total_loads": 150,
    "recent_loads": [
        {
            "latitude": 52.3676,
            "longitude": 4.9041,
            "location_name": "Amsterdam",
            "created_at": "2025-10-03 13:08:12"
        },
        ...
    ]
}
```

## Database File

The tracking data is stored in `weather_app.db`, a SQLite database file located in the project root directory.

**Database Path:** `weather_app.db`

**Note:** The `.db` files are excluded from version control via `.gitignore` to prevent accidental commits of user data.

## Usage

### Automatic Tracking

The tracking happens automatically:

1. **Game Moves**: When playing the 2048 game, every move (arrow key press) is tracked
2. **Location Loads**: When weather data is fetched for any location, the load is tracked

### Manual Querying

You can query the database directly using SQLite:

```bash
# View all game moves
sqlite3 weather_app.db "SELECT * FROM game_moves ORDER BY created_at DESC LIMIT 10;"

# View all location loads
sqlite3 weather_app.db "SELECT * FROM location_loads ORDER BY created_at DESC LIMIT 10;"

# Get move statistics
sqlite3 weather_app.db "SELECT direction, COUNT(*) as count FROM game_moves GROUP BY direction;"
```

## Privacy

- Tracking is anonymous by default (user_id is NULL for non-authenticated users)
- Authenticated users have their moves and location loads associated with their account
- All tracking data follows the same retention policy as user data

## Benefits

1. **Analytics**: Understand how users interact with the game and which locations are most popular
2. **User Insights**: For logged-in users, track their gameplay progress and location preferences
3. **Performance Monitoring**: Monitor API usage patterns and optimize accordingly
4. **Data-Driven Improvements**: Use tracking data to make informed decisions about feature development
