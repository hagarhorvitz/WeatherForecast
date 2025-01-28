from hashlib import sha512
from .app_config import AppConfig

class PasswordCyberHash:
    @staticmethod
    def hash(text):
        encode_text = text.encode("utf-8") + AppConfig.password_salt.encode("utf-8")
        print(f"encode_text: {encode_text}")
        hashed_text = sha512(encode_text).hexdigest()
        print(f"hashed_text: {hashed_text}")
        # output_text = hashed_text.hexdigest()  ## potential if i will need the object in hashed_text - the return output is the same as above
        return hashed_text