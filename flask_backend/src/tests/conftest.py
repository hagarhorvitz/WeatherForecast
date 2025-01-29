import pytest
from app import app

@pytest.fixture
def client():
    """Create a test client for Flask"""
    app.config["TESTING"] = True  # Enable testing mode
    client = app.test_client()
    yield client  # Return test client for use in tests