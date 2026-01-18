import os

class Config:
    APP_SECRET_KEY = os.getenv("APP_SECRET_KEY", "dev-secret")
    JWT_SECRET = os.getenv("JWT_SECRET", "dev-jwt-secret")

    DB_HOST = os.getenv("DB_HOST", "localhost")
    DB_PORT = int(os.getenv("DB_PORT", "3306"))
    DB_USER = os.getenv("DB_USER", "root")
    DB_PASSWORD = os.getenv("DB_PASSWORD", "")
    DB_NAME = os.getenv("DB_NAME", "desafio_fullstack")

