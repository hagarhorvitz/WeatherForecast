from unittest.mock import MagicMock
import pytest
from app import app
from utils.dal import DAL

@pytest.fixture
def client():
    app.config["TESTING"] = True  # Enable testing mode
    client = app.test_client()
    yield client  # Return test client for use in tests

@pytest.fixture
def user():
    user_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john_doe@walla.co.il",
        "password": "password123",
        "username": "johndoe"
    }
    return user_data

@pytest.fixture
def new_user():
    user = {
        "first_name": "Alice",
        "last_name": "Brown",
        "email": "aaa@walla.co.il",
        "password": "password456",
    }
    return user

@pytest.fixture
def valid_weather_params():
    return {
        "latitude": 52.52,
        "longitude": 13.405,
        "timezone": "Europe/London",
        "hourly": "temperature_2m,rain,snow_depth",
        "daily": "sunrise,sunset",
        "past_days": 0,
        "forecast_days": 7
    }

# @pytest.fixture
# def mock_db():
#     """✅ Mock only `insert()` to prevent real data being added to MySQL"""
#     mock = MagicMock(spec=DAL)
#     # ✅ Mock insert to return a fake user ID without adding to MySQL
#     mock.insert.return_value = 1  # Simulate "successful insert"
#     return mock


# @pytest.fixture
# def auth_headers(test_user):
#     """✅ Generate Authorization Header with JWT token"""
#     token = create_access_token(identity={"user_id": 1, "username": test_user["username"]})
#     return {"Authorization": f"Bearer {token}"}