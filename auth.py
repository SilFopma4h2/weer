#!/usr/bin/env python3
"""
Authentication utilities and middleware for the Weather App
"""

from functools import wraps
from typing import Optional
from fastapi import Request, HTTPException, status
from fastapi.responses import RedirectResponse
from database import SessionManager


def get_current_user(request: Request) -> Optional[dict]:
    """Get the current authenticated user from request"""
    session_id = request.cookies.get('session_id')
    if not session_id:
        return None
    
    return SessionManager.get_session_user(session_id)


def require_auth(redirect_to_login: bool = True):
    """Decorator to require authentication for routes"""
    def decorator(func):
        @wraps(func)
        async def wrapper(request: Request, *args, **kwargs):
            user = get_current_user(request)
            if not user:
                if redirect_to_login:
                    return RedirectResponse(url="/login", status_code=status.HTTP_302_FOUND)
                else:
                    raise HTTPException(
                        status_code=status.HTTP_401_UNAUTHORIZED,
                        detail="Authentication required"
                    )
            
            # Add user to request state
            request.state.user = user
            return await func(request, *args, **kwargs)
        
        return wrapper
    return decorator


def validate_email(email: str) -> bool:
    """Basic email validation"""
    import re
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))


def validate_password(password: str) -> tuple[bool, str]:
    """Password validation with requirements"""
    import re
    
    if len(password) < 8:
        return False, "Password must be at least 8 characters long"
    
    if not re.search(r'[A-Za-z]', password):
        return False, "Password must contain at least one letter"
    
    if not re.search(r'[0-9]', password):
        return False, "Password must contain at least one number"
    
    return True, "Password is valid"


def sanitize_input(text: str) -> str:
    """Basic input sanitization"""
    import re
    
    if not text:
        return ""
    
    # Strip whitespace and remove potential script tags
    text = text.strip()
    text = re.sub(r'<script.*?</script>', '', text, flags=re.IGNORECASE | re.DOTALL)
    text = re.sub(r'<.*?>', '', text)  # Remove all HTML tags
    
    return text