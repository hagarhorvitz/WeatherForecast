from email_validator import EmailNotValidError, validate_email

class UsersModel:
    def __init__(self, user_id, first_name, last_name, username, email, password):
        self.user_id = user_id
        self.first_name = first_name
        self.last_name = last_name
        self.username = username
        self.email = email
        self.password = password


    def validate_register(self):
        if not self.first_name: return "Please enter first name"
        if not self.last_name: return "Please enter last name"
        if not self.username: return "Missing username"
        if not self.email: return "Please enter email"
        if not self.password: return "Please enter password"
        if len(self.first_name) < 2 or len(self.first_name) > 45: return "Please ensure you entered first name between 2 to 45 characters long"
        if len(self.last_name) < 2 or len(self.last_name) > 45: return "Please ensure you entered last name between 2 to 45 characters long"
        if len(self.email) < 5 or len(self.email) > 80: return "Please ensure you entered an email between 5 to 60 characters long"
        if len(self.password) < 4 or len(self.password) > 20: return "Please ensure you entered a password between 4 to 20 characters long"
        try:
            validate_email(self.email)
        except EmailNotValidError as err:
            return f"Invalid email: {err} Please try again"
        return None

    def parameters_to_dict(self):
        return {
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "username": self.username,
            "email": self.email,
        }