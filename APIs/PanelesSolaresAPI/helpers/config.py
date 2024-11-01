from fastapi_mail import  ConnectionConfig


conf = ConnectionConfig(
    MAIL_USERNAME = "devin.hoppe93@ethereal.email",
    MAIL_PASSWORD = "GVfuhKxkp9jX2Tgmq2",
    MAIL_FROM = "test@email.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.ethereal.email",
    MAIL_FROM_NAME="Desired Name",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)