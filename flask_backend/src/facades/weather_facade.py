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
        new_weather = WeatherModel(latitude, longitude, timezone, hourly, daily, past_days, forecast_days)
        error = new_weather.validation_parameters()
        print(f"##facade## error:\n{error}")
        if error: raise ValidationError(error, 400, new_weather)
        weather = new_weather.parameters_to_dict()
        print(f"##facade## weather:\n{weather}")
        return self.logic.get_weather_api(weather)
