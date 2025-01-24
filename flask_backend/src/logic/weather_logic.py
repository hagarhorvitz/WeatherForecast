import requests
from utils.app_config import AppConfig
from models.error_model import *

class WeatherLogic:
    def __init__(self):
        self.send_requests = requests

    def get_weather_api(self, weather):
        print("##### response weather:\n", weather)
        response = self.send_requests.get(AppConfig.base_url, params=weather)
        print("##### response logic:\n", response)
        print("##### response.status_code logic:\n", response.status_code)
        print("##### response.text logic:\n", response.text)
        if response.status_code != 200: raise BadResponseError("Failed to fetch weather data", response.text)
        return response
        # return self.response.get(AppConfig.base_url, params=weather)

