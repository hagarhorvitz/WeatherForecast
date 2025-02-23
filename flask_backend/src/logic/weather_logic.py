import requests
from utils.app_config import AppConfig
from models.error_model import *

class WeatherLogic:
    def __init__(self):
        pass

    def get_weather_api(self, weather):
        response = requests.get(AppConfig.base_url, params=weather)
        response.raise_for_status()
        return response

