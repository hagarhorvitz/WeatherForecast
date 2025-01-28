from dotenv import load_dotenv
from os import environ

load_dotenv()
class AppConfig:
    is_development = environ.get("ENVIRONMENT") == "development"
    is_production = environ.get("ENVIRONMENT") == "production"
    secret_key = environ.get("SECRET_KEY")
    base_url = environ.get("OPEN_METEO_BASE_URL")
    mysql_host = environ.get("MYSQL_HOST")
    mysql_user = environ.get("MYSQL_USER")
    mysql_password = environ.get("MYSQL_PASSWORD")
    mysql_database = environ.get("MYSQL_DATABASE")
    password_salt = environ.get("PASSWORD_SALT")