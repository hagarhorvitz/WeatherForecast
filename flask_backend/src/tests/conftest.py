import pytest
from app import app

@pytest.fixture
def client():
    app.config["TESTING"] = True  # Enable testing mode
    client = app.test_client()
    yield client  # Return test client for use in tests

# @pytest.fixture
# def db():
#     """✅ Provides MySQL database connection from DAL"""
#     dal = DAL()  # ✅ Use your existing DAL for database connection
#     dal.connect()
#     yield dal
#     dal.disconnect()  # ✅ Clean up after test

@pytest.fixture
def user():
    user_data = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john_doe@walla.co.il",
        "username": "johndoe",
        "password": "password123"
    }
    return user_data

@pytest.fixture
def valid_weather_params():
    return {
        "latitude": 52.52,
        "longitude": 13.405,
        "timezone": "Europe/Berlin",
        "hourly": "temperature_2m",
        "daily": "precipitation_sum",
        "past_days": 0,
        "forecast_days": 7
    }

# @pytest.fixture
# def auth_headers(test_user):
#     """✅ Generate Authorization Header with JWT token"""
#     token = create_access_token(identity={"user_id": 1, "username": test_user["username"]})
#     return {"Authorization": f"Bearer {token}"}