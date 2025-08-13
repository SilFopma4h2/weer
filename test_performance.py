#!/usr/bin/env python3
"""
Performance and functionality tests for the Weather App MVP
"""

import asyncio
import time
import requests
import json
from typing import Dict, Any

class WeatherAppTester:
    def __init__(self, base_url: str = "http://localhost:8000"):
        self.base_url = base_url
        self.results = {}

    def test_endpoint_performance(self, endpoint: str, max_response_time: float = 0.5) -> Dict[str, Any]:
        """Test API endpoint response time"""
        url = f"{self.base_url}{endpoint}"
        
        # Warm up
        try:
            requests.get(url, timeout=5)
        except:
            pass
        
        # Measure performance
        times = []
        for i in range(5):
            start_time = time.time()
            try:
                response = requests.get(url, timeout=5)
                end_time = time.time()
                response_time = end_time - start_time
                times.append(response_time)
                
                status_code = response.status_code
                
            except requests.RequestException as e:
                end_time = time.time()
                response_time = end_time - start_time
                times.append(response_time)
                status_code = 0
                
        avg_time = sum(times) / len(times)
        max_time = max(times)
        min_time = min(times)
        
        result = {
            "endpoint": endpoint,
            "avg_response_time": round(avg_time * 1000, 2),  # Convert to ms
            "max_response_time": round(max_time * 1000, 2),
            "min_response_time": round(min_time * 1000, 2),
            "requirement_ms": max_response_time * 1000,
            "passes_requirement": avg_time <= max_response_time,
            "status_code": status_code
        }
        
        return result

    def test_frontend_load_time(self) -> Dict[str, Any]:
        """Test frontend load time using requests (simplified)"""
        url = self.base_url
        
        times = []
        for i in range(3):
            start_time = time.time()
            try:
                response = requests.get(url, timeout=5)
                end_time = time.time()
                load_time = end_time - start_time
                times.append(load_time)
            except requests.RequestException:
                end_time = time.time()
                load_time = end_time - start_time
                times.append(load_time)
        
        avg_time = sum(times) / len(times)
        
        result = {
            "test": "frontend_load_time",
            "avg_load_time_ms": round(avg_time * 1000, 2),
            "requirement_ms": 2000,
            "passes_requirement": avg_time <= 2.0,
        }
        
        return result

    def test_health_endpoint(self) -> Dict[str, Any]:
        """Test health endpoint functionality"""
        try:
            response = requests.get(f"{self.base_url}/health", timeout=5)
            data = response.json()
            
            result = {
                "test": "health_endpoint",
                "status_code": response.status_code,
                "response_has_status": "status" in data,
                "response_has_timestamp": "timestamp" in data,
                "passes": response.status_code == 200 and "status" in data
            }
        except Exception as e:
            result = {
                "test": "health_endpoint",
                "error": str(e),
                "passes": False
            }
        
        return result

    def run_all_tests(self) -> Dict[str, Any]:
        """Run all performance and functionality tests"""
        print("🧪 Running Weather App MVP Tests...")
        print("=" * 50)
        
        # Test health endpoint
        health_result = self.test_health_endpoint()
        print(f"✅ Health Endpoint: {'PASS' if health_result['passes'] else 'FAIL'}")
        
        # Test frontend load time
        frontend_result = self.test_frontend_load_time()
        print(f"⏱️  Frontend Load Time: {frontend_result['avg_load_time_ms']}ms (req: <2000ms) - {'PASS' if frontend_result['passes_requirement'] else 'FAIL'}")
        
        # Test API endpoints performance
        endpoints = ["/current", "/forecast", "/alerts"]
        endpoint_results = []
        
        for endpoint in endpoints:
            result = self.test_endpoint_performance(endpoint, 0.5)  # 500ms requirement
            endpoint_results.append(result)
            status = "PASS" if result['passes_requirement'] else "FAIL"
            print(f"🔧 {endpoint}: {result['avg_response_time']}ms (req: <500ms) - {status}")
        
        # Summary
        all_results = {
            "health": health_result,
            "frontend": frontend_result,
            "endpoints": endpoint_results,
            "summary": {
                "total_tests": 1 + 1 + len(endpoints),
                "passed_tests": sum([
                    health_result['passes'],
                    frontend_result['passes_requirement'],
                    *[r['passes_requirement'] for r in endpoint_results]
                ])
            }
        }
        
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {all_results['summary']['passed_tests']}/{all_results['summary']['total_tests']} tests passed")
        
        return all_results

if __name__ == "__main__":
    tester = WeatherAppTester()
    results = tester.run_all_tests()
    
    # Save results to file
    with open("/tmp/test_results.json", "w") as f:
        json.dump(results, f, indent=2)
    
    print(f"\n📄 Detailed results saved to /tmp/test_results.json")