from flask import Blueprint, request, jsonify
import requests
from utils.app_config import AppConfig
from facades.weather_facade import WeatherFacade
from models.error_model import *

api_weather_blueprint = Blueprint("api_view", __name__)

# @api_weather_blueprint.route('/weather', methods=['GET'])
# def get_weather():
#     try:
#         latitude = request.args.get("latitude")
#         longitude = request.args.get("longitude")
#         timezone = request.args.get("timezone")
#         hourly = request.args.get("hourly", "").split(",")
#         daily = request.args.get("daily", "").split(",")
#         past_days = request.args.get("past_days")
#         forecast_days = request.args.get("forecast_days")
#         print("hourly: ", hourly)
#         print("daily: ", daily)
#         if not latitude or not longitude:
#             return jsonify({"error": f"Missing required parameter latitude or longitude"}), 400

#         query_params = {
#             "latitude": latitude,
#             "longitude": longitude,
#             "timezone": timezone,
#             "hourly": hourly,
#             "daily": daily,
#             "past_days": past_days,
#             "forecast_days": forecast_days,
#         }
#         print("query_params: ", query_params)
#         print("query_params.v: ", query_params.values())

#         response = requests.get(AppConfig.base_url, params=query_params)
#         print("response: ", response)
#         if response.status_code != 200:
#             return jsonify({
#                 "error": "Failed to fetch weather data",
#                 "details": response.text
#             }), response.status_code

#         print("response.json(): ", response.json())
#         return jsonify(response.json()), 200
#     except Exception as err:
#         return jsonify({
#             "error": "Internal server error",
#             "details": str(err)
#         }), 500

weather_facade = WeatherFacade()

@api_weather_blueprint.route('/weather', methods=['GET'])
def get_weather():
    try:
        response = weather_facade.get_weather_data()
        if (response.status_code < 400 and response.status_code != 200):
            raise GetError(f"Unexpected status code: {response.status_code}", response.status_code)
        print(f"##view## response.json():\n{response.json()}")
        return jsonify(response.json()), 200
    except requests.exceptions.HTTPError as err:
        print(f"HTTPError: {str(err.response.text)}\nstatus_code: {err.response.status_code}")
        return jsonify({"Error": f"HTTP Error: {str(err.response.text)}"}), err.response.status_code
    except requests.exceptions.RequestException as err:
        print(f"RequestException: {str(err)}")
        return jsonify({"Error": f"Requests Error: {str(err)}"}), 500
    except ValidationError as err:
        print(f"ValidationError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except GetError as err:
        print(f"GetError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except Exception as err:
        print(f"ExceptionError: {str(err)}")
        return jsonify({"Error": f"An unexpected general error occurred: {str(err)}"}), 500