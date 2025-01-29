from flask import Blueprint, request, jsonify
from utils.app_config import AppConfig
from facades.users_facade import UsersFacade
from models.error_model import *
from models.status_code_model import StatusCode
from flask_jwt_extended import create_access_token


users_blueprint = Blueprint("users_view", __name__)

users_facade = UsersFacade()

@users_blueprint.route("/register", methods = ["POST"])
def register():
    try:
        data = request.get_json()
        new_user = users_facade.register_new_user(data)
        # Create a JWT token for the user
        user_identity = {
            "user_id": new_user["user_id"],
            "username": new_user["username"],
        }
        access_token = create_access_token(identity=user_identity)
        if not access_token:
            raise RuntimeError("Failed to generate access token")
        print(f"##view## access_token: {access_token}")
        # Add the token and user details to the response
        response = {
            "token": access_token,
            "user": {
                "user_id": new_user["user_id"],
                "username": new_user["username"],
                "first_name": new_user["first_name"],
                "last_name": new_user["last_name"],
                "email": new_user["email"],
            },
        }
        print(f"##view## response: {response}")
        return jsonify(response), StatusCode.Created.value
    except (ValidationError, AuthenticationError) as err:
        print(f"ValidationError/AuthenticationError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except RuntimeError as jwt_err:
            print(f"JWT RuntimeError: {str(jwt_err)}")
            return jsonify({"Error": f"Failed to create access token: {str(jwt_err)}, please try again later"}), StatusCode.InternalServerError.value
    except Exception as err:
        print(f"ExceptionError: {str(err)}")
        return jsonify({"Error": f"Error: {str(err)}"}), StatusCode.InternalServerError.value
    

@users_blueprint.route("/login", methods = ["POST"])
def log_in():
    try:
        data = request.get_json()
        user = users_facade.login_user(data)
        # Create a JWT token for the user
        user_identity = {
            "user_id": user["user_id"],
            "username": user["username"],
        }
        access_token = create_access_token(identity=user_identity)
        if not access_token:
            raise RuntimeError("Failed to generate access token")
        print(f"##view## access_token: {access_token}")
        # Add the token and user details to the response
        response = {
            "token": access_token,
            "user": {
                "user_id": user["user_id"],
                "username": user["username"],
                "first_name": user["first_name"],
                "last_name": user["last_name"],
                "email": user["email"],
            },
        }
        print(f"##view## response: {response}")
        return jsonify(response), StatusCode.OK.value
    except (ValidationError, AuthenticationError) as err:
        print(f"ValidationError/AuthenticationError: {str(err.message)}\nstatus_code: {err.status_code}")
        return jsonify({"Error": str(err.message)}), err.status_code
    except RuntimeError as jwt_err:
            print(f"JWT RuntimeError: {str(jwt_err)}")
            return jsonify({"Error": f"Failed to create access token: {str(jwt_err)}, please try again later"}), StatusCode.InternalServerError.value
    except Exception as err:
        print(f"ExceptionError: {str(err)}")
        return jsonify({"Error": f"Error: {str(err)}"}), StatusCode.InternalServerError.value