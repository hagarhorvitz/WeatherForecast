from flask import Blueprint, request, jsonify
import requests
from utils.app_config import AppConfig

api_weather_blueprint = Blueprint("api_view", __name__) 

@api_weather_blueprint.route('/weather', methods=['GET'])
def get_weather():
    # latitude = request.args.get('latitude')
    # longitude = request.args.get('longitude')
    try:
        query_params = request.args.to_dict()
        required_params = ["latitude", "longitude"]
        missing_params = [param for param in required_params if param not in query_params]
        if missing_params:
            return jsonify({"error": f"Missing required parameters: {', '.join(missing_params)}"}), 400
        
        response = requests.get(AppConfig.base_url, params=query_params)
        if response.status_code != 200:
            return jsonify({
                "error": "Failed to fetch weather data",
                "details": response.text
            }), response.status_code
        
        weather_data = response.json()
        print("weather_data: ", weather_data)
        return jsonify(weather_data), 200
    except Exception as err:
        return jsonify({
            "error": "Internal server error",
            "details": str(err)
        }), 500

