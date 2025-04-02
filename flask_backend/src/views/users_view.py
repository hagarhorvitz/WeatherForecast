from flask import Blueprint, make_response, request, jsonify
from facades.users_facade import UsersFacade
from models.error_model import *
from models.status_code_model import StatusCode
from flask_jwt_extended import create_access_token, create_refresh_token, get_jwt, get_jwt_identity, jwt_required, set_access_cookies, set_refresh_cookies, unset_jwt_cookies
from utils.email_service import send_registration_email
from models.users_model import *

users_blueprint = Blueprint("users_view", __name__)

users_facade = UsersFacade()

@users_blueprint.route("/register", methods = ["POST"])
def register():
    try:
        data = request.get_json()
        new_user = users_facade.register_new_user(data)
        user_identity = str(new_user["user_id"])  # JWT `sub` must be a string!
        additional_claims = {
            "username": new_user["username"],
            "first_name": new_user["first_name"],
            "last_name": new_user["last_name"],
            "email": new_user["email"],
        }
        access_token = create_access_token(identity=user_identity, additional_claims=additional_claims)
        print(f"##view register## access_token: {access_token}")
        if not access_token:
            raise RuntimeError("Failed to generate access token")
        if not isinstance(access_token, str):
            raise RuntimeError("Failed to generate a valid string access token")

        refresh_token = create_refresh_token(identity=user_identity)

        response = {
            "user": {
                "user_id": new_user["user_id"],
                "username": new_user["username"],
                "first_name": new_user["first_name"],
                "last_name": new_user["last_name"],
                "email": new_user["email"],
            },
            "msg": "Registered successfully!"
        }
        print(f"##view register## response: {response}")

        resp = make_response(jsonify(response), StatusCode.Created.value)

        set_access_cookies(resp, access_token)  # ✅ Securely store token in an HttpOnly cookie
        set_refresh_cookies(resp, refresh_token)
        print("##view register## set access & refresh cookies: done✅")  
        print(f"##view register## resp Set-Cookie headers: {resp.headers.getlist('Set-Cookie')}")          
        
        send_registration_email(additional_claims)
        print("##view register## email sent✅")  
        return resp
    except (ValidationError, AuthenticationError) as err:
        print(f"register ValidationError/AuthenticationError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except RuntimeError as jwt_err:
            print(f"register JWT RuntimeError: {str(jwt_err)}")
            return jsonify({"Error": f"Failed to create access token: {str(jwt_err)}, please try again later"}), StatusCode.InternalServerError.value
    except Exception as err:
        print(f"register ExceptionError: {str(err)}")
        return jsonify({"Error": f"Error: {str(err)}"}), StatusCode.InternalServerError.value
    

@users_blueprint.route("/login", methods = ["POST"])
def log_in():
    try:
        data = request.get_json()
        user = users_facade.login_user(data)
            # Convert user_id to a string and store other user info in claims
        user_identity = str(user["user_id"])  # JWT `sub` must be a string!
        additional_claims = {
            "username": user["username"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "email": user["email"],
        }
        access_token = create_access_token(identity=user_identity, additional_claims=additional_claims)
        print(f"##view log_in## access_token: {access_token}")
        if not access_token:
            raise RuntimeError("Failed to generate access token")
        if not isinstance(access_token, str):
            raise RuntimeError("Failed to generate a valid string access token")
        refresh_token = create_refresh_token(identity=user_identity)

        response = {
            "user": {
                "user_id": user["user_id"],
                "username": user["username"],
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"],
            },
            "msg": "Login successful!"
        }
        print(f"##view log_in## response: {response}")

        resp = make_response(jsonify(response), StatusCode.OK.value)

            # ✅ Set access & refresh token cookies
        set_access_cookies(resp, access_token)  # ✅ Securely store token in an HttpOnly cookie
        set_refresh_cookies(resp, refresh_token)
        print("##view register## set access & refresh cookies: done✅") 
        print(f"##view log_in## resp Set-Cookie headers: {resp.headers.getlist('Set-Cookie')}")

        return resp
    except (ValidationError, AuthenticationError) as err:
        print(f"log_in ValidationError/AuthenticationError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except RuntimeError as jwt_err:
            print(f"log_in JWT RuntimeError: {str(jwt_err)}")
            return jsonify({"Error": f"Failed to create access token: {str(jwt_err)}, please try again later"}), StatusCode.InternalServerError.value
    except Exception as err:
        print(f"log_in ExceptionError: {str(err)}")
        return jsonify({"Error": f"Error: {str(err)}"}), StatusCode.InternalServerError.value
    

@users_blueprint.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    try:
        response = make_response(jsonify({"msg": "Logged out"}), StatusCode.OK.value)
        print(f"##view Logout## response: {response}")
        unset_jwt_cookies(response)  # ✅ Unset JWT access token
            # ✅ Force delete cookies by setting an expired date
        response.set_cookie("access_token_cookie", "", expires=0, httponly=True, path="/")
        response.set_cookie("csrf_access_token", "", expires=0, httponly=True, path="/")
        print("Logout successful, cookies cleared✅")  # ✅ Debug log
        print(f"##view Logout## resp after unset: {response}")
        return response
    except Exception as err:
        print(f"Logout ExceptionError: {str(err)}")
        return jsonify({"Error": f"Error: {str(err)}"}), StatusCode.InternalServerError.value


@users_blueprint.route("/user_info", methods=["GET"])
@jwt_required()  # ✅ Token is automatically extracted from the cookie
def get_user_info():
    try:
        user_identity = get_jwt_identity()
        if not user_identity:
            raise RuntimeError("Failed to access user_identity")
        user_claims = get_jwt()
        if not user_claims:
            raise RuntimeError("Failed to access user_claims")
        user_data = {
            "user_id": user_identity,
            "username": user_claims["username"],
            "first_name": user_claims["first_name"],
            "last_name": user_claims["last_name"],
            "email": user_claims["email"]
        }
        print(f"get_user_info()- user_data: {user_data}")
        response = make_response(jsonify({"user": user_data}), StatusCode.OK.value)
        return response
    except RuntimeError as err_jwt:
        print(f"Logout RuntimeError: {str(err_jwt)}")
        return jsonify({"Error": f"Error: {str(err_jwt)}"})
    except Exception as err:
        print(f"Logout ExceptionError: {str(err)}")
        return jsonify({"Error": f"Error: {str(err)}"}), StatusCode.InternalServerError.value


@users_blueprint.route("/refresh", methods=["POST"])
@jwt_required(refresh=True)  # ✅ Requires a valid refresh token
def refresh():
    try:
        user_identity = get_jwt_identity()  # Get user ID from refresh token
        user = users_facade.get_user_by_id(int(user_identity)) # ✅ Rebuild additional claims for the new access token
        additional_claims = {
            "username": user["username"],
            "first_name": user["first_name"],
            "last_name": user["last_name"],
            "email": user["email"],
        }
        new_access_token = create_access_token(identity=user_identity, additional_claims=additional_claims)
        response = make_response(jsonify({"msg": "Token refreshed!"}), StatusCode.OK.value)
        set_access_cookies(response, new_access_token)  # ✅ Store new access token in cookies
        return response
    except AuthenticationError as err:
        print(f"Refresh token AuthenticationError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except Exception as err:
        print(f"Refresh token error: {str(err)}")
        return jsonify({"Error": "Could not refresh token"}), StatusCode.Unauthorized.value


@users_blueprint.route("/whatMyUsername", methods=["GET", "POST"])
@jwt_required()
def send_username_to_email():
    pass