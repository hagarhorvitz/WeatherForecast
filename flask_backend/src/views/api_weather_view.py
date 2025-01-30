from flask import Blueprint, request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
import requests
from utils.app_config import AppConfig
from facades.weather_facade import WeatherFacade
from models.error_model import *
from models.status_code_model import StatusCode

api_weather_blueprint = Blueprint("api_weather_view", __name__)

weather_facade = WeatherFacade()

@api_weather_blueprint.route('/weather', methods=['GET'])
# @jwt_required()  # Protect this route with JWT authentication
def get_weather():
    try:
        # Retrieve the identity (user info) from the token
        # current_user = get_jwt_identity()
        # print(f"##view weather## current_user: {current_user}")
        response = weather_facade.get_weather_data()
        if (response.status_code < StatusCode.BadRequest.value and response.status_code != StatusCode.OK.value):
            raise GetError(f"Unexpected status code: {response.status_code}", response.status_code)
        print(f"##view weather## response.json():\n{response.json()}")
        return jsonify(response.json()), StatusCode.OK.value
        #     return jsonify({
        #     "user": current_user,  # Include the logged-in user's info in the response
        #     "weather_data": response.json(),
        # }), StatusCode.OK.value
    except requests.exceptions.HTTPError as err:
        print(f"HTTPError: {str(err.response.text)}\nstatus_code: {err.response.status_code}")
        return jsonify({"Error": f"HTTP Error: {str(err.response.text)}"}), err.response.status_code
    except requests.exceptions.RequestException as err:
        print(f"RequestException: {str(err)}")
        return jsonify({"Error": f"Requests Error: {str(err)}"}), StatusCode.InternalServerError.value
    except ValidationError as err:
        print(f"ValidationError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except Exception as err:
        print(f"ExceptionError: {str(err)}")
        return jsonify({"Error": f"An unexpected general error occurred: {str(err)}"}), StatusCode.InternalServerError.value
    


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