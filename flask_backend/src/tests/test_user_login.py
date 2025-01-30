from models.status_code_model import StatusCode

def test_login_with_email_success(client, user):
    credentials = {
        "email": user["email"],
        "password": user["password"]
    }
    response = client.post("/login", json=credentials)
    assert response.status_code == StatusCode.OK.value
    data = response.get_json()
    assert "token" in data
    assert "user" in data


def test_login_with_username_success(client, user):
    credentials = {
        "username": user["username"],
        "password": user["password"]
    }
    response = client.post("/login", json=credentials)
    assert response.status_code == StatusCode.OK.value
    data = response.get_json()
    assert "token" in data
    assert "user" in data


def test_login_by_email_invalid_password(client, user):
    wrong_credentials = {
        "email": user["email"],
        "password": "wrongpassword"
    }
    response = client.post("/login", json=wrong_credentials)
    assert response.status_code == StatusCode.Unauthorized.value
    data = response.get_json()
    assert "Error" in data


def test_login_by_username_invalid_password(client, user):
    wrong_credentials = {
        "username": user["username"],
        "password": "wrongpassword"
    }
    response = client.post("/login", json=wrong_credentials)
    assert response.status_code == StatusCode.Unauthorized.value
    data = response.get_json()
    assert "Error" in data


def test_login_nonexistent_user_email(client, user):
    nonexistent_user = {
        "email": "doesnotexist@walla.com",
        "password": user["password"]
    }
    response = client.post("/login", json=nonexistent_user)
    assert response.status_code == StatusCode.Unauthorized.value
    data = response.get_json()
    assert "Error" in data


def test_login_nonexistent_user_username(client, user):
    nonexistent_user = {
        "username": "doesnotexist",
        "password": user["password"]
    }
    response = client.post("/login", json=nonexistent_user)
    assert response.status_code == StatusCode.Unauthorized.value
    data = response.get_json()
    assert "Error" in data


def test_login_missing_fields_w_password(client, user):
    incomplete_credentials = {
        "password": user["password"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value
    data = response.get_json()
    assert "Error" in data


def test_login_missing_password_w_email(client, user):
    incomplete_credentials = {
        "email": user["email"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value
    data = response.get_json()
    assert "Error" in data


def test_login_missing_password_w_username(client, user):
    incomplete_credentials = {
        "username": user["username"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value
    data = response.get_json()
    assert "Error" in data


def test_login_invalid_email_format(client, user):
    invalid_email_credentials = {
        "email": "i.nvalid@email",
        "password": user["password"]
    }
    response = client.post("/login", json=invalid_email_credentials)
    assert response.status_code == StatusCode.BadRequest.value
    data = response.get_json()
    assert "Error" in data

