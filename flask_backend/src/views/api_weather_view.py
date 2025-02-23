from flask import Blueprint, jsonify, make_response
from flask_jwt_extended import get_jwt_identity, jwt_required
import requests
from facades.weather_facade import WeatherFacade
from models.error_model import *
from models.status_code_model import StatusCode

api_weather_blueprint = Blueprint("api_weather_view", __name__)

weather_facade = WeatherFacade()

@api_weather_blueprint.route('/weather', methods=['GET'])
@jwt_required()  # Protect this route with JWT authentication and Token is automatically extracted from the cookie
def get_weather():
    try:
        current_user = get_jwt_identity() # Retrieve the identity (user info) from the token
        if not current_user:
            raise RuntimeError("Fetching weather available for registered users only!")
        
        response = weather_facade.get_weather_data()
        if (response.status_code < StatusCode.BadRequest.value and response.status_code != StatusCode.OK.value):
            raise GetError(f"Unexpected status code: {response.status_code}", response.status_code)
        print(f"##view weather## response.json():\n{response.json()}")

        res = make_response(jsonify(response.json()), StatusCode.OK.value)
        return res
    except RuntimeError as err_jwt:
        print(f"get_weather RuntimeError: {str(err_jwt)}")
        return jsonify({"Error": f"Error: {str(err_jwt)}"})
    except requests.exceptions.HTTPError as err:
        print(f"HTTPError: {str(err.response.text)}\nstatus_code: {err.response.status_code}")
        return jsonify({"Error": f"HTTP Error: {str(err.response.text)}"}), err.response.status_code
    except requests.exceptions.RequestException as err:
        print(f"RequestException: {str(err)}")
        return jsonify({"Error": f"Requests Error: {str(err)}"}), StatusCode.InternalServerError.value
    except (ValidationError, GetError) as err:
        print(f"ValidationError/GetError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except Exception as err:
        print(f"ExceptionError: {str(err)}")
        return jsonify({"Error": f"An unexpected general error occurred: {str(err)}"}), StatusCode.InternalServerError.value
    