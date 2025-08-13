#!/usr/bin/env python3
"""
Authentication system tests for the Weather App
"""

import requests
import json
from database import UserManager, SessionManager, init_database
import os


def test_authentication_system():
    """Test the complete authentication system"""
    
    print("🧪 Testing Weather App Authentication System...")
    print("=" * 60)
    
    # Initialize database for testing
    init_database()
    
    results = {
        "user_creation": False,
        "user_authentication": False,
        "duplicate_email_prevention": False,
        "location_storage": False,
        "location_update": False,
        "session_management": False
    }
    
    # Test 1: User Creation
    print("1. Testing user creation...")
    user_id = UserManager.create_user("testuser@example.com", "password123", "52.3676,4.9041")
    if user_id:
        results["user_creation"] = True
        print("   ✅ User created successfully")
    else:
        print("   ❌ Failed to create user")
    
    # Test 2: User Authentication
    print("2. Testing user authentication...")
    user = UserManager.authenticate_user("testuser@example.com", "password123")
    if user and user['email'] == "testuser@example.com":
        results["user_authentication"] = True
        print("   ✅ User authentication successful")
    else:
        print("   ❌ Failed to authenticate user")
    
    # Test 3: Duplicate Email Prevention  
    print("3. Testing duplicate email prevention...")
    duplicate_user_id = UserManager.create_user("testuser@example.com", "anotherpassword", "")
    if duplicate_user_id is None:
        results["duplicate_email_prevention"] = True
        print("   ✅ Duplicate email correctly prevented")
    else:
        print("   ❌ Duplicate email not prevented")
    
    # Test 4: Location Storage
    print("4. Testing location storage...")
    if user and user.get('location') == "52.3676,4.9041":
        results["location_storage"] = True
        print("   ✅ Location stored correctly")
    else:
        print("   ❌ Location not stored correctly")
    
    # Test 5: Location Update
    print("5. Testing location update...")
    update_success = UserManager.update_user_location(user['id'], "51.5074,-0.1278")
    updated_user = UserManager.get_user_by_id(user['id'])
    if update_success and updated_user and updated_user.get('location') == "51.5074,-0.1278":
        results["location_update"] = True
        print("   ✅ Location updated successfully")
    else:
        print("   ❌ Failed to update location")
    
    # Test 6: Session Management
    print("6. Testing session management...")
    session_id = SessionManager.create_session(user['id'])
    session_user = SessionManager.get_session_user(session_id)
    if session_id and session_user and session_user['id'] == user['id']:
        results["session_management"] = True
        print("   ✅ Session management working")
        
        # Test session deletion
        SessionManager.delete_session(session_id)
        deleted_session_user = SessionManager.get_session_user(session_id)
        if deleted_session_user is None:
            print("   ✅ Session deletion working")
        else:
            print("   ❌ Session deletion failed")
            results["session_management"] = False
    else:
        print("   ❌ Session management failed")
    
    # Summary
    print("\n" + "=" * 60)
    passed_tests = sum(results.values())
    total_tests = len(results)
    
    print(f"📊 Authentication Test Summary: {passed_tests}/{total_tests} tests passed")
    
    for test_name, passed in results.items():
        status = "✅ PASS" if passed else "❌ FAIL"
        print(f"   {test_name.replace('_', ' ').title()}: {status}")
    
    return results


def test_api_endpoints():
    """Test that API endpoints still work with authentication"""
    print("\n🌐 Testing API endpoints with authentication...")
    print("=" * 60)
    
    base_url = "http://localhost:8000"
    
    # Test endpoints that don't require authentication
    endpoints = ["/health", "/current", "/forecast", "/alerts"]
    results = {}
    
    for endpoint in endpoints:
        try:
            response = requests.get(f"{base_url}{endpoint}", timeout=5)
            results[endpoint] = response.status_code == 200
            status = "✅ PASS" if results[endpoint] else "❌ FAIL"
            print(f"   {endpoint}: {status} (Status: {response.status_code})")
        except Exception as e:
            results[endpoint] = False
            print(f"   {endpoint}: ❌ FAIL (Error: {str(e)[:50]}...)")
    
    passed = sum(results.values())
    total = len(results)
    print(f"\n📊 API Endpoint Summary: {passed}/{total} endpoints working")
    
    return results


if __name__ == "__main__":
    # Clean up any existing test database
    if os.path.exists("weather_app.db"):
        os.remove("weather_app.db")
    
    # Run authentication tests
    auth_results = test_authentication_system()
    
    # Run API tests (requires server to be running)
    try:
        api_results = test_api_endpoints()
    except Exception as e:
        print(f"\n⚠️  Could not test API endpoints - server may not be running: {e}")
        api_results = {}
    
    # Save results
    all_results = {
        "authentication_tests": auth_results,
        "api_tests": api_results,
        "summary": {
            "auth_passed": sum(auth_results.values()),
            "auth_total": len(auth_results),
            "api_passed": sum(api_results.values()) if api_results else 0,
            "api_total": len(api_results) if api_results else 0
        }
    }
    
    with open("/tmp/auth_test_results.json", "w") as f:
        json.dump(all_results, f, indent=2)
    
    print(f"\n📄 Detailed results saved to /tmp/auth_test_results.json")