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
app.config["JWT_TOKEN_LOCATION"] = ["headers", "cookies"]  # ✅ Tokens in both headers & cookies
    # ✅ Store refresh token in cookies
app.config["JWT_REFRESH_TOKEN_LOCATION"] = ["headers", "cookies"]
app.config["JWT_REFRESH_COOKIE_NAME"] = "refresh_token"  # Custom name
app.config["JWT_REFRESH_COOKIE_HTTPONLY"] = True  # Prevent JS access
app.config["JWT_REFRESH_COOKIE_SAMESITE"] = "None"  # Allow cross-origin requests
app.config["JWT_REFRESH_COOKIE_SECURE"] = True  # Change to True in production (HTTPS)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 3600  # 1 hour
app.config["JWT_REFRESH_TOKEN_EXPIRES"] = 604800  # 7 days
    # ✅ Make sure access tokens work cross-origin
app.config["JWT_COOKIE_SAMESITE"] = "None"  # Allow cross-origin requests
app.config["JWT_COOKIE_SECURE"] = True  # Ensure cookies are sent over HTTPS # Change to True in production
app.config["JWT_COOKIE_CSRF_PROTECT"] = True      # Built-in CSRF protection

jwt = JWTManager(app)

app.register_blueprint(api_weather_blueprint)
app.register_blueprint(users_blueprint)

# (2) CONTENT SECURITY POLICY
@app.after_request
def add_csp_header(response):
    """
    This sets a strict CSP header to allow React, MUI, Google Fonts, and other libraries.

    """
    csp_policy = (
        "default-src 'self'; "
        "script-src 'self' https://cdnjs.cloudflare.com https://apis.google.com; "  # ✅ Allow Google APIs & CDNs
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net; "  # ✅ Allow inline styles + Google Fonts
        "font-src 'self' https://fonts.gstatic.com; "  # ✅ Allow Google Fonts
        "img-src 'self' data:; "  # ✅ Allow images & inline base64 images
        "connect-src 'self' http://localhost:5000; "  # ✅ Allow API requests (replace with your API)
        "object-src 'none'; "
        "base-uri 'none'; "
        "frame-ancestors 'none';"
    )
    response.headers["Content-Security-Policy"] = csp_policy
    return response

@app.errorhandler(StatusCode.NotFound.value)
def not_found(error):
    return jsonify({"Error": f"Endpoint not found, {str(error)}"}), StatusCode.NotFound.value

@app.errorhandler(StatusCode.Unauthorized.value)
def unauthorized(error):
    return jsonify({"Error": f"Endpoint not found, {str(error)}"}), StatusCode.Unauthorized.value

# if __name__ == '__main__':
#     app.run(debug=True)
if __name__ == "__main__" and not any("pytest" in arg for arg in sys.argv):
    app.run(debug=True)