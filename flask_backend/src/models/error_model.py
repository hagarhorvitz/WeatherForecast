
class GetError(Exception):
    def __init__(self, message):
        super().__init__(message)
        self.message = message


class ValidationError(GetError):
    def __init__(self, message, model):
        super().__init__(message)
        self.model = model


class BadResponseError(GetError):
    def __init__(self, message, response_text):
        super().__init__(message)
        self.response_text = response_text
