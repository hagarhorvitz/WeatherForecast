from flask import Flask
from utils.app_config import AppConfig

app = Flask(__name__)
app.secret_key = AppConfig.secret_key