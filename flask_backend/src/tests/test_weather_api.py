import requests
from app import app
from models.status_code_model import StatusCode

def test_get_weather_success(client, valid_weather_params):
    """✅ Test successful weather API response with real Open-Meteo request"""
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.OK.value  # ✅ Open-Meteo should return 200 OK
    data = response.get_json()
    assert "latitude" in data
    assert "longitude" in data
    assert "timezone" in data
    assert "hourly" in data
    assert "daily" in data
    # assert isinstance(data["latitude"], float)
    # assert isinstance(data["longitude"], float)


def test_missing_latitude(client, valid_weather_params):
    del valid_weather_params["latitude"]
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_missing_longitude(client, valid_weather_params):
    del valid_weather_params["longitude"]
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_invalid_latitude(client, valid_weather_params):
    valid_weather_params["latitude"] = 9999
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_invalid_longitude(client, valid_weather_params):
    valid_weather_params["longitude"] = int(-9999)
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_invalid_timezone(client, valid_weather_params):
    valid_weather_params["timezone"] = "Fake/Timezone"
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_invalid_forecast_days(client, valid_weather_params):
    valid_weather_params["forecast_days"] = 5
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_largest_forecast_day(client, valid_weather_params):
    valid_weather_params["forecast_days"] = 16  # Open-Meteo supports up to 16 days
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.OK.value  # ✅ Should work
    data = response.get_json()
    assert "daily" in data


def test_smallest_forecast_day(client, valid_weather_params):
    valid_weather_params["forecast_days"] = 1  # Open-Meteo supports up to 16 days
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.OK.value  # ✅ Should work
    data = response.get_json()
    assert "daily" in data


def test_negative_past_days(client, valid_weather_params):
    valid_weather_params["past_days"] = int(-4) 
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Should return error
    data = response.get_json()
    assert "Error" in data


def test_largest_past_day(client, valid_weather_params):
    valid_weather_params["past_days"] = 92 
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.OK.value  # ✅ Should work
    data = response.get_json()
    assert "daily" in data 


def test_get_weather_request_no_params(client):
    response = client.get("/weather")  # No query params
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_get_weather_request_invalid_endpoint(client, valid_weather_params):
    response = client.get("/invalid_endpoint", query_string=valid_weather_params)  # Wrong API route
    assert response.status_code == StatusCode.NotFound.value  # ❌ Should return 404
    data = response.get_json() if response.is_json else {}
    assert "Error" in data


def test_invalid_hourly(client, valid_weather_params):
    valid_weather_params["hourly"] = "temture_2m"
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data


def test_invalid_daily(client, valid_weather_params):
    valid_weather_params["daily"] = ["sunrise, sunset"]
    response = client.get("/weather", query_string=valid_weather_params)
    assert response.status_code == StatusCode.BadRequest.value  # ❌ Open-Meteo should return 400
    data = response.get_json()
    assert "Error" in data