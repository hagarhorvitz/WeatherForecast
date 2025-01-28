

class GetError(Exception):
    def __init__(self, message, status_code):
        super().__init__(message, status_code)
        self.message = message
        self.status_code = status_code

class ValidationError(GetError):
    def __init__(self, message, status_code, model):
        super().__init__(message, status_code)
        self.model = model

class AuthenticationError(GetError):
    def __init__(self, message, status_code, model = None):
        super().__init__(message, status_code)
        self.model = model
