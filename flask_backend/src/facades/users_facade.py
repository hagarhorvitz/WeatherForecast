from flask import request
from models.users_model import UsersModel
from logic.users_logic import UsersLogic
from models.error_model import *
from utils.cyber_hash import PasswordCyberHash
from models.status_code_model import StatusCode

class UsersFacade:
    def __init__(self):
        self.logic = UsersLogic()

    def create_username(self, firstname, lastname):
        create_username = str(firstname+lastname).lower()
        print(f"##create_username facade## - create_username: {create_username}")
        check_exist_username = self.logic.check_username(create_username) #returns number - 0 = no, 1 and higher = yes
        print(f"##create_username facade## - check_exist_username: {check_exist_username}")
        print(f"##create_username facade## - str(create_username+str(check_exist_username): {str(create_username+str(check_exist_username))}")
        username = create_username if check_exist_username == 0 else str(create_username+str(check_exist_username))
        print(f"##create_username facade## - username: {username}")
        return username

    def register_new_user(self, data):
        first_name = data.get("first_name", "").capitalize()
        last_name = data.get("last_name", "").capitalize()
        print(f"##register facade## - first_name: {first_name}")
        print(f"##register facade## - last_name: {last_name}")
        email = data.get("email")
        password = data.get("password")
        username = self.create_username(first_name, last_name)
        print(f"##register facade## - username: {username}")
        new_user = UsersModel(None, first_name, last_name, username, email, password)
        error = new_user.validate_register()
        if error: raise ValidationError(error, StatusCode.BadRequest.value, new_user)
        if self.logic.check_email_exists(email): raise AuthenticationError("Email is already exist in the system", StatusCode.BadRequest.value, new_user)
        new_user.password = PasswordCyberHash.hash(new_user.password)
        user_id = self.logic.insert_new_user(new_user)
        print(f"##register facade## - user_id: {user_id}")
        new_user.user_id = user_id
        return new_user.parameters_to_dict()
