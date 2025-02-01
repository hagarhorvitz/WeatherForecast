from models.status_code_model import StatusCode

def test_register_success(client, new_user):
    response = client.post("/register", json=new_user)
    assert response.status_code == StatusCode.Created.value # ✅ Should work
    data = response.get_json()
    assert "token" in data
    assert "user" in data
    print(f"username: {data["user"]["username"]}")
    assert data["user"]["first_name"] == new_user["first_name"]
    assert data["user"]["email"] == new_user["email"]


def test_register_duplicate_username(client, user):
    duplicate_user = {
        "first_name": user["first_name"],
        "last_name": user["last_name"],
        "email": "uniqueJohn@walla.com",
        "password": "pass12345"
    }
    response = client.post("/register", json=duplicate_user)
    assert response.status_code == StatusCode.Created.value # ✅ Should work
    data = response.get_json()
    assert "token" in data
    assert "user" in data
    print(f"username: {data["user"]["username"]}")
    assert data["user"]["username"] == "johndoe1"


def test_register_existing_email(client, user):
    new_user_w_existing_email = {
        "first_name": "Alice",
        "last_name": "Brown",
        "email": user["email"], 
        "password": "password456"
    }
    response = client.post("/register", json=new_user_w_existing_email)
    assert response.status_code == StatusCode.Unauthorized.value # ❌ Should return 401
    data = response.get_json()
    assert "Error" in data
    assert "Email" in data["Error"]


def test_register_missing_fields(client):
    incomplete_user = {
        "first_name": "Mike",
        "email": "mike.smith@gmail.com"
    } # Missing "last_name" and "password"
    response = client.post("/register", json=incomplete_user)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data


def test_register_invalid_email(client, user):
    del user["username"]
    user["email"] = "in.valid-e@mail"
    print(f"user: {user}")
    response = client.post("/register", json=user)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data
    assert "email" in data["Error"]


def test_register_weak_password(client, user):
    del user["username"]
    user["password"] = "a3"
    print(f"user: {user}")
    response = client.post("/register", json=user)
    assert response.status_code == StatusCode.BadRequest.value # ❌ Should return 400
    data = response.get_json()
    assert "Error" in data
    assert "password" in data["Error"]



# new_user = {
#     "first_name": "Johnny",
#     "last_name": "Walker",
#     "email": "johnnyW@walla.com",
#     "password": "mypassword12345"
# }
# invalid_email_user = {
#     "first_name": "Sarah",
#     "last_name": "Connor",
#     "email": "in.valid-e@mail",
#     "password": "strongpass"
# }
# weak_password_user = {
#     "first_name": "Jane",
#     "last_name": "Doe",
#     "email": "janedoe@walla.com",
#     "password": "1a3"  # Too short
# }