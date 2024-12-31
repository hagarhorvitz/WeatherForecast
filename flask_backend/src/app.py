from flask import Flask
from flask_cors import CORS
from utils.app_config import AppConfig
from views.api_view import api_weather_blueprint

app = Flask(__name__)
CORS(app)

app.secret_key = AppConfig.secret_key

app.register_blueprint(api_weather_blueprint)

if __name__ == '__main__':
    app.run(debug=True)