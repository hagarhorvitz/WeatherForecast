import sys
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models.status_code_model import StatusCode
from utils.app_config import AppConfig
from views.api_weather_view import api_weather_blueprint
from views.users_view import users_blueprint

app = Flask(__name__)
CORS(app)

app.secret_key = AppConfig.secret_key
jwt = JWTManager(app)

app.register_blueprint(api_weather_blueprint)
app.register_blueprint(users_blueprint)

@app.errorhandler(StatusCode.NotFound.value)
def not_found(error):
    return jsonify({"Error": f"Endpoint not found, {str(error)}"}), StatusCode.NotFound.value

# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == "__main__" and not any("pytest" in arg for arg in sys.argv):
    app.run(debug=True)