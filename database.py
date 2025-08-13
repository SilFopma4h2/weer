#!/usr/bin/env python3
"""
Database models and utilities for the Weather App user authentication system
"""

import sqlite3
import os
from datetime import datetime
from typing import Optional, Dict, Any
import bcrypt


DATABASE_PATH = "weather_app.db"


def get_db_connection():
    """Get a SQLite database connection"""
    conn = sqlite3.connect(DATABASE_PATH)
    conn.row_factory = sqlite3.Row  # Enable dict-like access to rows
    return conn


def init_database():
    """Initialize the database with required tables"""
    conn = get_db_connection()
    try:
        # Create users table
        conn.execute('''
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password_hash TEXT NOT NULL,
                location TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        ''')
        
        # Create sessions table for session management
        conn.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                user_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                expires_at TIMESTAMP NOT NULL,
                FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
            )
        ''')
        
        conn.commit()
        print("✅ Database initialized successfully")
        
    except sqlite3.Error as e:
        print(f"❌ Database initialization error: {e}")
        raise
    finally:
        conn.close()


class UserManager:
    """User management operations"""
    
    @staticmethod
    def create_user(email: str, password: str, location: Optional[str] = None) -> Optional[int]:
        """Create a new user account"""
        try:
            # Hash the password
            password_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            
            conn = get_db_connection()
            cursor = conn.execute(
                'INSERT INTO users (email, password_hash, location) VALUES (?, ?, ?)',
                (email.lower().strip(), password_hash, location)
            )
            user_id = cursor.lastrowid
            conn.commit()
            conn.close()
            
            return user_id
            
        except sqlite3.IntegrityError:
            # Email already exists
            return None
        except Exception as e:
            print(f"Error creating user: {e}")
            return None
    
    @staticmethod
    def authenticate_user(email: str, password: str) -> Optional[Dict[str, Any]]:
        """Authenticate user with email and password"""
        try:
            conn = get_db_connection()
            user = conn.execute(
                'SELECT * FROM users WHERE email = ?',
                (email.lower().strip(),)
            ).fetchone()
            conn.close()
            
            if user and bcrypt.checkpw(password.encode('utf-8'), user['password_hash'].encode('utf-8')):
                return {
                    'id': user['id'],
                    'email': user['email'],
                    'location': user['location'],
                    'created_at': user['created_at'],
                    'updated_at': user['updated_at']
                }
            
            return None
            
        except Exception as e:
            print(f"Error authenticating user: {e}")
            return None
    
    @staticmethod
    def get_user_by_id(user_id: int) -> Optional[Dict[str, Any]]:
        """Get user by ID"""
        try:
            conn = get_db_connection()
            user = conn.execute(
                'SELECT * FROM users WHERE id = ?',
                (user_id,)
            ).fetchone()
            conn.close()
            
            if user:
                return {
                    'id': user['id'],
                    'email': user['email'],
                    'location': user['location'],
                    'created_at': user['created_at'],
                    'updated_at': user['updated_at']
                }
            
            return None
            
        except Exception as e:
            print(f"Error getting user: {e}")
            return None
    
    @staticmethod
    def update_user_location(user_id: int, location: str) -> bool:
        """Update user's preferred location"""
        try:
            conn = get_db_connection()
            conn.execute(
                'UPDATE users SET location = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
                (location, user_id)
            )
            conn.commit()
            conn.close()
            return True
            
        except Exception as e:
            print(f"Error updating user location: {e}")
            return False


class SessionManager:
    """Session management operations"""
    
    @staticmethod
    def create_session(user_id: int) -> str:
        """Create a new session for user"""
        import secrets
        from datetime import timedelta
        
        session_id = secrets.token_urlsafe(32)
        expires_at = datetime.now() + timedelta(days=30)  # Session expires in 30 days
        
        try:
            conn = get_db_connection()
            conn.execute(
                'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)',
                (session_id, user_id, expires_at)
            )
            conn.commit()
            conn.close()
            
            return session_id
            
        except Exception as e:
            print(f"Error creating session: {e}")
            return None
    
    @staticmethod
    def get_session_user(session_id: str) -> Optional[Dict[str, Any]]:
        """Get user from session ID"""
        if not session_id:
            return None
            
        try:
            conn = get_db_connection()
            result = conn.execute('''
                SELECT u.*, s.expires_at 
                FROM users u 
                JOIN sessions s ON u.id = s.user_id 
                WHERE s.id = ? AND s.expires_at > CURRENT_TIMESTAMP
            ''', (session_id,)).fetchone()
            conn.close()
            
            if result:
                return {
                    'id': result['id'],
                    'email': result['email'],
                    'location': result['location'],
                    'created_at': result['created_at'],
                    'updated_at': result['updated_at']
                }
            
            return None
            
        except Exception as e:
            print(f"Error getting session user: {e}")
            return None
    
    @staticmethod
    def delete_session(session_id: str) -> bool:
        """Delete a session (logout)"""
        try:
            conn = get_db_connection()
            conn.execute('DELETE FROM sessions WHERE id = ?', (session_id,))
            conn.commit()
            conn.close()
            return True
            
        except Exception as e:
            print(f"Error deleting session: {e}")
            return False
    
    @staticmethod
    def cleanup_expired_sessions():
        """Clean up expired sessions"""
        try:
            conn = get_db_connection()
            conn.execute('DELETE FROM sessions WHERE expires_at < CURRENT_TIMESTAMP')
            conn.commit()
            conn.close()
            
        except Exception as e:
            print(f"Error cleaning up sessions: {e}")


# Initialize database on import
if __name__ == "__main__":
    init_database()