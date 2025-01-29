
def test_register_success(client):
    """Test successful user registration"""
    new_user = {
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "password": "password123"
    }
    response = client.post("/register", json=new_user)
    data = response.get_json()

    assert response.status_code == 201  # Expect HTTP 201 Created
    assert "token" in data  # Token should be in response
    assert "user" in data  # User details should be in response
    assert data["user"]["first_name"] == "John"
    assert data["user"]["email"] == "john.doe@example.com"

def test_register_existing_email(client):
    """Test registration with an already existing email"""
    existing_user = {
        "first_name": "Alice",
        "last_name": "Brown",
        "email": "john.doe@example.com",  # Use the same email from previous test
        "password": "password456"
    }
    response = client.post("/register", json=existing_user)
    data = response.get_json()

    assert response.status_code == 400  # Expect HTTP 400 Bad Request
    assert "Error" in data
    assert data["Error"] == "Email already exists in the system"

def test_register_missing_fields(client):
    """Test registration with missing fields"""
    incomplete_user = {
        "first_name": "Mike",
        "email": "mike.smith@example.com"
        # Missing "last_name" and "password"
    }
    response = client.post("/register", json=incomplete_user)
    data = response.get_json()

    assert response.status_code == 400  # Expect HTTP 400 Bad Request
    assert "Error" in data
    assert "Please enter last name" in data["Error"] or "Please enter password" in data["Error"]

def test_register_invalid_email(client):
    """Test registration with an invalid email format"""
    invalid_email_user = {
        "first_name": "Sarah",
        "last_name": "Connor",
        "email": "invalid-email",
        "password": "strongpass"
    }
    response = client.post("/register", json=invalid_email_user)
    data = response.get_json()

    assert response.status_code == 400  # Expect HTTP 400 Bad Request
    assert "Error" in data
    assert "Invalid email" in data["Error"]
