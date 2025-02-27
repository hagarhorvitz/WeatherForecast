from flask_mail import Message
from flask import current_app
from flask_mail import Mail
from colorama import Style, Fore

mail = Mail()

def send_email(subject, recipient, body):
    try:
        msg = Message(
            subject=subject,
            recipients=[recipient],
            body=body
        )
        
        with current_app.app_context():
            mail.send(msg)
        print(f"✅ Email sent successfully to {recipient}")
    except Exception as e:
        print(f"❌ Failed to send email: {str(e)}")

def send_registration_email(user):
    subject = "Welcome to Open-Meteo Weather API!"
    body = f"Hello {user['first_name']} {user['last_name']} 🤩,\n\nYour account has been created successfully!\nYour username is: {user['username']}\nPlease keep it for next login option by username/email.\n\nBest,\nWeather by Shraga Team"
    
    print(f"Sending registration email to {user['email']}...")
    send_email(subject, user['email'], body)
    
