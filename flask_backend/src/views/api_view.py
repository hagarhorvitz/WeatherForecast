from flask import Blueprint, request, jsonify
import requests
from utils.app_config import AppConfig

api_weather_blueprint = Blueprint("api_view", __name__) 

@api_weather_blueprint.route('/weather', methods=['GET'])
def get_weather():
    try:
        # query_params = request.args.to_dict(flat=False)
        # required_params = ["latitude", "longitude"]
        # missing_params = [param for param in required_params if param not in query_params]

        latitude = request.args.get("latitude")
        longitude = request.args.get("longitude")
        timezone = request.args.get("timezone")
        hourly = request.args.get("hourly", "").split(",")
        daily = request.args.get("daily", "").split(",")
        past_days = request.args.get("past_days")
        forecast_days = request.args.get("forecast_days")
        print("hourly: ", hourly)
        print("daily: ", daily)
        if not latitude or not longitude:
            return jsonify({"error": f"Missing required parameter latitude or longitude"}), 400
        
        query_params = {
            "latitude": latitude,
            "longitude": longitude,
            "timezone": timezone,
            "hourly": hourly,
            "daily": daily,
            "past_days": past_days,
            "forecast_days": forecast_days,
        }
        print("query_params: ", query_params)
        print("query_params.v: ", query_params.values())
        
        response = requests.get(AppConfig.base_url, params=query_params)
        print("response: ", response)
        if response.status_code != 200:
            return jsonify({
                "error": "Failed to fetch weather data",
                "details": response.text
            }), response.status_code
        
        print("response.json(): ", response.json())
        return jsonify(response.json()), 200
    except Exception as err:
        return jsonify({
            "error": "Internal server error",
            "details": str(err)
        }), 500

