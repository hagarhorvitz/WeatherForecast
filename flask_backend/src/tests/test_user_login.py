from models.status_code_model import StatusCode

def test_login_w_email_success(client, user):
    credentials = {
        "email": user["email"],
        "password": user["password"]
    }
    response = client.post("/login", json=credentials)
    assert response.status_code == StatusCode.OK.value # ✅ Should work
    data = response.get_json()
    assert "token" in data
    assert "user" in data


def test_login_w_username_success(client, user):
    credentials = {
        "username": user["username"],
        "password": user["password"]
    }
    response = client.post("/login", json=credentials)
    assert response.status_code == StatusCode.OK.value # ✅ Should work
    data = response.get_json()
    assert "token" in data
    assert "user" in data


def test_login_missing_identifier(client, user):
    incomplete_credentials = {
        "password": user["password"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_invalid_email_format(client, user):
    invalid_email_credentials = {
        "email": "i.nvalid@email",
        "password": user["password"]
    }
    response = client.post("/login", json=invalid_email_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_w_email_wrong_password(client, user):
    wrong_credentials = {
        "email": user["email"],
        "password": "wrongpassword"
    }
    response = client.post("/login", json=wrong_credentials)
    assert response.status_code == StatusCode.Unauthorized.value # ❌ Should return 401
    data = response.get_json()
    assert "Error" in data


def test_login_wrong_email(client, user):
    nonexistent_user = {
        "email": "doesnotexist@walla.com",
        "password": user["password"]
    }
    response = client.post("/login", json=nonexistent_user)
    assert response.status_code == StatusCode.Unauthorized.value # ❌ Should return 401
    data = response.get_json()
    assert "Error" in data


def test_login_w_email_missing_password(client, user):
    incomplete_credentials = {
        "email": user["email"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_w_email_empty_password(client, user):
    incomplete_credentials = {
        "email": user["email"],
        "password": ""
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data

def test_login_w_email_password_none(client, user):
    incomplete_credentials = {
        "email": user["email"],
        "password": None
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_empty_email(client, user):
    incomplete_credentials = {
        "email": "",
        "password": user["password"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_none_email(client, user):
    incomplete_credentials = {
        "email": None,
        "password": user["password"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_w_email_short_password(client, user):
    incomplete_credentials = {
        "email": user["email"],
        "password": "a3"
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_short_email(client, user):
    incomplete_credentials = {
        "email": "aa3",
        "password": user["password"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_w_username_wrong_password(client, user):
    wrong_credentials = {
        "username": user["username"],
        "password": "wrongpassword"
    }
    response = client.post("/login", json=wrong_credentials)
    assert response.status_code == StatusCode.Unauthorized.value # ❌ Should return 401
    data = response.get_json()
    assert "Error" in data


def test_login_wrong_username(client, user):
    nonexistent_user = {
        "username": "doesnotexist",
        "password": user["password"]
    }
    response = client.post("/login", json=nonexistent_user)
    assert response.status_code == StatusCode.Unauthorized.value # ❌ Should return 401
    data = response.get_json()
    assert "Error" in data


def test_login_w_username_missing_password(client, user):
    incomplete_credentials = {
        "username": user["username"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_w_username_empty_password(client, user):
    incomplete_credentials = {
        "username": user["username"],
        "password": ""
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_w_username_password_none(client, user):
    incomplete_credentials = {
        "username": user["username"],
        "password": None
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_empty_username(client, user):
    incomplete_credentials = {
        "username": "",
        "password": user["password"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_none_username(client, user):
    incomplete_credentials = {
        "username": None,
        "password": user["password"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data
    

def test_login_w_username_short_password(client, user):
    incomplete_credentials = {
        "username": user["username"],
        "password": "a3"
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_login_short_username(client, user):
    incomplete_credentials = {
        "username": "aa3",
        "password": user["password"]
    }
    response = client.post("/login", json=incomplete_credentials)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data









