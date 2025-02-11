import sys
from flask import Flask, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from models.status_code_model import StatusCode
from utils.app_config import AppConfig
from views.api_weather_view import api_weather_blueprint
from views.users_view import users_blueprint

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"], supports_credentials=True)

# Secret key and JWT setup
app.secret_key = AppConfig.secret_key
app.config["JWT_SECRET_KEY"] = AppConfig.secret_key

# (1) STORING JWTs IN COOKIES:
app.config["JWT_TOKEN_LOCATION"] = ["cookies"]    # We'll store tokens in cookies
app.config["JWT_COOKIE_SAMESITE"] = "None"      # Helps protect against CSRF
app.config["JWT_COOKIE_SECURE"] = False           # True in production over HTTPS!
app.config["JWT_COOKIE_CSRF_PROTECT"] = True      # Built-in CSRF protection
# If you are running only on localhost HTTP during dev, set JWT_COOKIE_SECURE=False so the cookie isn't blocked.

jwt = JWTManager(app)

app.register_blueprint(api_weather_blueprint)
app.register_blueprint(users_blueprint)

# (2) CONTENT SECURITY POLICY
@app.after_request
def add_csp_header(response):
    """
    This sets a strict CSP header to reduce XSS risk.
    If your React code or libraries need external resources,
    adjust 'script-src', 'style-src', or add any needed domains.
    """
    csp_policy = (
        "default-src 'self'; "    # All resources by default must come from same origin
        "script-src 'self'; "     # Only allow scripts hosted on same origin
        "style-src 'self'; "      # Only allow styles from same origin
        "object-src 'none'; "     # Disallow Flash/other embedded objects
        "base-uri 'none'; "       # Disallow base URI changes
        "frame-ancestors 'none';" # Disallow this site to be iframed
    )
    response.headers["Content-Security-Policy"] = csp_policy
    return response

@app.errorhandler(StatusCode.NotFound.value)
def not_found(error):
    return jsonify({"Error": f"Endpoint not found, {str(error)}"}), StatusCode.NotFound.value

# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == "__main__" and not any("pytest" in arg for arg in sys.argv):
    app.run(debug=True)