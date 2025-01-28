from utils.app_config import AppConfig
from utils.dal import DAL
from models.error_model import *

class UsersLogic:
    def __init__(self):
        self.dal = DAL()

    def insert_new_user(self, user): ## send user object ##
        sql = "INSERT INTO open_meteo_weather.users (first_name, last_name, username, email, password) VALUES (%s,%s,%s,%s,%s)"
        return self.dal.insert(sql, (user.first_name, user.last_name, user.username, user.email, user.password))

    def check_email_exists(self, email):
        sql = "SELECT exists(SELECT * FROM open_meteo_weather.users WHERE email = %s) as email_is_exists"
        output = self.dal.get_scalar(sql, (email, ))
        return output["email_is_exists"] == 1 ## 1 = true / 0 = false
    
    def check_username(self, username):
        sql = "SELECT count(user_id) as is_username FROM open_meteo_weather.users WHERE username LIKE %s"
        output = self.dal.get_scalar(sql, (f"%{username}%", ))
        print(f"output check username: {output}")
        print(f"output[is_username]: {output["is_username"]}")
        return output["is_username"]
        
