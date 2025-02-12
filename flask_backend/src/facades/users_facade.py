from flask import request
from models.users_model import UsersModel
from logic.users_logic import UsersLogic
from models.error_model import *
from utils.cyber_hash import PasswordCyberHash
from models.status_code_model import StatusCode
from models.credentials_model import CredentialModel

class UsersFacade:
    def __init__(self):
        self.logic = UsersLogic()

    def create_username(self, firstname, lastname):
        create_username = str(firstname+lastname).lower()
        print(f"##create_username facade## - create_username: {create_username}")
        check_exist_username = self.logic.check_and_count_username(create_username) #returns number - 0 = no, 1 and higher = yes
        print(f"##create_username facade## - check_exist_username: {check_exist_username}")
        print(f"##create_username facade## - str(create_username+str(check_exist_username): {str(create_username+str(check_exist_username))}")
        username = create_username if check_exist_username == 0 else str(create_username+str(check_exist_username))
        print(f"##create_username facade## - username: {username}")
        return username


    def register_new_user(self, data):
        first_name = data.get("first_name", "").capitalize()
        last_name = data.get("last_name", "").capitalize()
        email = data.get("email")
        password = data.get("password")
        username = self.create_username(first_name, last_name)
        new_user = UsersModel(None, first_name, last_name, username, email, password)
        error = new_user.validate_register()
        if error: raise ValidationError(error, StatusCode.BadRequest.value, new_user)
        if self.logic.check_email_exists(email): raise AuthenticationError("Email is already exist in the system", StatusCode.Unauthorized.value, new_user)
        new_user.password = PasswordCyberHash.hash(new_user.password)
        user_id = self.logic.insert_new_user(new_user)
        new_user.user_id = user_id
        return new_user.parameters_to_dict()
    

    def login_user(self, data):
        print(f"##login facade## data: {data}")
        login_key_type = "email" if "email" in data else "username" if "username" in data else None
        identifier = data.get(login_key_type)
        password = data.get("password")
        credentials = CredentialModel(identifier, password)
        if login_key_type == "email":
            error = credentials.validate_login_by_email()
            if error: raise ValidationError(error, StatusCode.BadRequest.value, credentials)
            user = self.logic.get_user_by_email_and_password(identifier, PasswordCyberHash.hash(password))
        elif login_key_type == "username":
            print(f"##login facade## identifier is a username: {identifier}")
            error = credentials.validate_login_by_username()
            if error: raise ValidationError(error, StatusCode.BadRequest.value, credentials)
            user = self.logic.get_user_by_username_and_password(identifier, PasswordCyberHash.hash(password))
        else:
            raise ValidationError("Please provide all login inputs", StatusCode.BadRequest.value, credentials)
        if not user: raise AuthenticationError("User not found, please try again", StatusCode.Unauthorized.value, credentials)
        if "password" in user: del user["password"]
        print(f"##login facade## user: {user}")
        return user


    def get_user_by_id(self, user_id):
        print(f"##get_user_by_id facade## user_id: {user_id}")
        user = self.logic.get_user_by_id(user_id)
        if not user: raise AuthenticationError(f"User with ID ({user_id}) not found, please try again", StatusCode.NotFound.value)
        if "password" in user: del user["password"]
        print(f"##get_user_by_id facade## user: {user}")
        return user

        
        


