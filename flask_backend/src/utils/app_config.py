from dotenv import load_dotenv
from os import environ

load_dotenv()
class AppConfig:
    secret_key = environ.get("SECRET_KEY")
    base_url = environ.get("OPEN_METEO_BASE_URL")