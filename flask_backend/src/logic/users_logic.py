from utils.app_config import AppConfig
from utils.dal import DAL
from models.error_model import *

class UsersLogic:
    def __init__(self):
        self.dal = DAL()

    def get_user_by_email_and_password(self, email, password):
        query = "SELECT user_id, first_name, last_name, username, email FROM open_meteo_weather.users WHERE email = %s AND password = %s"
        result = self.dal.get_scalar(query, (email, password))
        print(f"##Logic## email: {result}")
        return result
    
    def get_user_by_username_and_password(self, username, password):
        query = "SELECT user_id, first_name, last_name, username, email FROM open_meteo_weather.users WHERE username = %s AND password = %s"
        result = self.dal.get_scalar(query, (username, password))
        print(f"##Logic## username: {result}")
        return result
    
    # def get_user(self, hash_password, identifier):
    #     query = "SELECT * FROM open_meteo_weather.users WHERE password = %s email = %s OR username = %s"
    #     result = self.dal.get_scalar(query, (hash_password, identifier, identifier,))
    #     print(f"result email: {result}")
    #     return result

    def insert_new_user(self, user): ## send user object ##
        query = "INSERT INTO open_meteo_weather.users (first_name, last_name, username, email, password) VALUES (%s,%s,%s,%s,%s)"
        return self.dal.insert(query, (user.first_name, user.last_name, user.username, user.email, user.password))

    def check_email_exists(self, email):
        query = "SELECT exists(SELECT * FROM open_meteo_weather.users WHERE email = %s) as email_is_exists"
        output = self.dal.get_scalar(query, (email, ))
        return output["email_is_exists"] == 1 ## 1 = true / 0 = false
    
    # def check_username_exists(self, username):
    #     query = "SELECT exists(SELECT * FROM open_meteo_weather.users WHERE username = %s) as username_is_exists"
    #     output = self.dal.get_scalar(query, (username, ))
    #     return output["username_is_exists"] == 1 ## 1 = true / 0 = false
    
    def check_and_count_username(self, username):
        query = "SELECT count(user_id) as is_username FROM open_meteo_weather.users WHERE username LIKE %s"
        output = self.dal.get_scalar(query, (f"%{username}%", ))
        print(f"output check username: {output}")
        print(f"output[is_username]: {output["is_username"]}")
        return output["is_username"]
        
