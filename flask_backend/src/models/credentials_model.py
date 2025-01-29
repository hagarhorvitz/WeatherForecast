import re
from email_validator import EmailNotValidError, validate_email

class CredentialModel:
    def __init__(self, identifier, password):
        self.identifier = identifier
        self.password = password


    def validate_login_by_email(self):
        if not self.identifier: return "Missing email, please enter or change to login with username"
        if not self.password: return "Missing password, please enter"
        if len(self.identifier) < 4 or len(self.identifier) > 80: return "Please ensure you entered a valid email length"
        if len(self.password) < 4 or len(self.password) > 20: return "Please ensure you entered a valid password length"
        try:
            validate_email(self.identifier)
            print(f"validate_email(self.identifier): {validate_email(self.identifier)}")
        except EmailNotValidError as err:
            return f"Invalid email: {err} Please try again"
        return None
    
    def validate_login_by_username(self):
        if not self.identifier: return "Missing username, please enter or change to login with email"
        if not self.password: return "Missing password, please enter"
        if len(self.identifier) < 4 or len(self.identifier) > 80: return "Please ensure you entered a valid username length"
        if len(self.password) < 4 or len(self.password) > 20: return "Please ensure you entered a valid password length"
        return None
        