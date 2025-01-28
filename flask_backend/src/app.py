from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from utils.app_config import AppConfig
from views.api_weather_view import api_weather_blueprint
from views.users_view import users_blueprint

app = Flask(__name__)
CORS(app)

app.secret_key = AppConfig.secret_key
jwt = JWTManager(app)

app.register_blueprint(api_weather_blueprint)
app.register_blueprint(users_blueprint)

if __name__ == '__main__':
    app.run(debug=True)