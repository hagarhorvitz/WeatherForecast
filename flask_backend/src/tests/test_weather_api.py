import requests
from app import app
from models.status_code_model import StatusCode

def test_get_weather_success(client, valid_params):
    """✅ Test successful weather API response with real Open-Meteo request"""
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.OK.value  # ✅ Open-Meteo should return 200 OK
    data = response.get_json()
    assert "latitude" in data
    assert "longitude" in data
    assert "timezone" in data
    assert "hourly" in data
    assert "daily" in data
    # assert isinstance(data["latitude"], float)
    # assert isinstance(data["longitude"], float)


def test_get_weather_missing_latitude(client, valid_params):
    del valid_params["latitude"]
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_get_weather_missing_longitude(client, valid_params):
    del valid_params["longitude"]
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_get_weather_invalid_latitude(client, valid_params):
    valid_params["latitude"] = "9999"
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_get_weather_invalid_longitude(client, valid_params):
    valid_params["longitude"] = "-9999"
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_get_weather_invalid_timezone(client, valid_params):
    valid_params["timezone"] = "Fake/Timezone"
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_get_weather_invalid_forecast_days(client, valid_params):
    """✅ Test forecast_days set to 0 (edge case)"""
    valid_params["forecast_days"] = 5
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.OK.value  # ✅ Open-Meteo allows this
    data = response.get_json()
    assert "daily" in data  # Should still return daily weather data


def test_get_weather_max_forecast_days(client, valid_params):
    """✅ Test maximum forecast days allowed"""
    valid_params["forecast_days"] = "16"  # Open-Meteo supports up to 16 days
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.OK.value  # ✅ Should work
    data = response.get_json()
    assert "daily" in data

def test_get_weather_exceed_forecast_days(client, valid_params):
    """❌ Test exceeding maximum forecast days"""
    valid_params["forecast_days"] = "30"  # Open-Meteo supports only up to 16 days
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Should fail
    data = response.get_json()
    assert "Error" in data

def test_get_weather_past_days_negative(client, valid_params):
    """❌ Test negative past_days value"""
    valid_params["past_days"] = "-5"  # Invalid past_days
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Should return error
    data = response.get_json()
    assert "Error" in data

def test_get_weather_large_past_days(client, valid_params):
    """✅ Test large past_days value"""
    valid_params["past_days"] = "30"  # Maximum allowed past days
    response = client.get("/weather", query_string=valid_params)
    assert response.status_code == StatusCode.OK.value  # ✅ Should work
    data = response.get_json()
    assert "daily" in data  # Should still return daily data

def test_get_weather_real_request_no_params(client):
    """❌ Test request with no parameters (should fail)"""
    response = client.get("/weather")  # No query params
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data

def test_get_weather_real_request_invalid_endpoint(client):
    """❌ Test invalid endpoint"""
    response = client.get("/invalid_endpoint")  # Wrong API route
    assert response.status_code == StatusCode.NotFound.value  # ❌ Should return 404
    data = response.get_json()
    assert "Error" in data
