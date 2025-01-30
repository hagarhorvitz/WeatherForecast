from models.status_code_model import StatusCode

def test_register_success(client):
    new_user = {
        "first_name": "Johnny",
        "last_name": "Walker",
        "email": "johnnyW@walla.com",
        "password": "mypassword12345"
    }
    response = client.post("/register", json=new_user)
    assert response.status_code == StatusCode.Created.value
    data = response.get_json()
    assert "token" in data
    assert "user" in data
    assert data["user"]["first_name"] == "Johnny"
    assert data["user"]["email"] == "johnnyW@walla.com"


def test_register_duplicate_username(client, user):
    duplicate_user = {
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": "uniqueJohn@walla.com",
        "password": "pass12345"
    }
    response = client.post("/register", json=duplicate_user)
    assert response.status_code == StatusCode.Created.value
    data = response.get_json()
    assert "token" in data
    assert "user" in data
    assert data["user"]["username"] == "johndoe1"


def test_register_existing_email(client):
    new_user_w_existing_email = {
        "first_name": "Alice",
        "last_name": "Brown",
        "email": "john_doe@walla.co.il", 
        "password": "password456"
    }
    response = client.post("/register", json=new_user_w_existing_email)
    assert response.status_code == StatusCode.BadRequest.value
    data = response.get_json()
    assert "Error" in data
    assert data["Error"] == "Email already exists in the system"


def test_register_missing_fields(client):
    incomplete_user = {
        "first_name": "Mike",
        "email": "mike.smith@example.com"
        # Missing "last_name" and "password"
    }
    response = client.post("/register", json=incomplete_user)
    assert response.status_code == StatusCode.BadRequest.value
    data = response.get_json()
    assert "Error" in data
    assert "Please enter last name" in data["Error"] or "Please enter password" in data["Error"]


def test_register_invalid_email(client):
    invalid_email_user = {
        "first_name": "Sarah",
        "last_name": "Connor",
        "email": "in.valid-e@mail",
        "password": "strongpass"
    }
    response = client.post("/register", json=invalid_email_user)
    assert response.status_code == StatusCode.BadRequest.value
    data = response.get_json()
    assert "Error" in data
    assert "Invalid email" in data["Error"]


def test_register_weak_password(client):
    weak_password_user = {
        "first_name": "Jane",
        "last_name": "Doe",
        "email": "janedoe@walla.com",
        "password": "1a3"  # Too short
    }
    response = client.post("/register", json=weak_password_user)
    assert response.status_code == StatusCode.BadRequest.value
    data = response.get_json()
    assert "password" in data["Error"]
