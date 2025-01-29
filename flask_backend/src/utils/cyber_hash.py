from hashlib import sha512
from .app_config import AppConfig

class PasswordCyberHash:
    @staticmethod
    def hash(plain_password):
        encode_text = plain_password.encode("utf-8") + AppConfig.password_salt.encode("utf-8")
        print(f"encode_text: {encode_text}")
        hashed_text = sha512(encode_text).hexdigest()
        print(f"hashed_text: {hashed_text}")
        # output_password = hashed_password.hexdigest()  ## potential if i will need the object in hashed_text - the return output is the same as above
        return hashed_text
    
    @staticmethod
    def verify(plain_password, hashed_password):
        encode_text = plain_password.encode("utf-8") + AppConfig.password_salt.encode("utf-8")
        expected_hashed_text = sha512(encode_text).hexdigest()  # Hash the input password
        print(f"Expected hashed text: {expected_hashed_text}")
        print(f"Stored hashed text: {hashed_password}")
        return expected_hashed_text == hashed_password  # Compare with stored hash