from flask import request
from models.weather_model import WeatherModel
from logic.weather_logic import WeatherLogic
from models.error_model import *

class WeatherFacade:
    def __init__(self):
        self.logic = WeatherLogic()

    def get_weather_data(self):
        latitude = request.args.get("latitude")
        longitude = request.args.get("longitude")
        timezone = request.args.get("timezone")
        hourly = request.args.get("hourly", "").split(",")
        daily = request.args.get("daily", "").split(",")
        past_days = request.args.get("past_days")
        forecast_days = request.args.get("forecast_days")
        print("##### hourly:\n", hourly)
        print("##### daily:\n", daily)
        new_weather = WeatherModel(latitude, longitude, timezone, hourly, daily, past_days, forecast_days)
        print("##### new_weather:\n", new_weather)
        error = new_weather.validation_parameters()
        print("##### error:\n", error)
        if error: raise ValidationError(error, new_weather)
        print("##### self.logic.get_weather_api(new_weather):\n", self.logic.get_weather_api(new_weather))
        return self.logic.get_weather_api(new_weather)
