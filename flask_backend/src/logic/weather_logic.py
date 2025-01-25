import requests
from utils.app_config import AppConfig
from models.error_model import *

class WeatherLogic:
    def __init__(self):
        pass

    def get_weather_api(self, weather):
        response = requests.get(AppConfig.base_url, params=weather)
        if response.status_code != 200: raise GetError(response.text, response.status_code)
        print("##logic## response:\n", response)
        print("##logic## response.status_code:\n", response.status_code)
        print("##logic## response.text:\n", response.text)
        return response
        # return self.response.get(AppConfig.base_url, params=weather)

