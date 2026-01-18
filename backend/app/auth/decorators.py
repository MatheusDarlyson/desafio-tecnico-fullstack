from functools import wraps
from flask import request, jsonify, current_app

from .jwt import decode_token

def require_auth(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        auth_header = request.headers.get("Authorization", "")

        if not auth_header or not auth_header.startswith("Bearer "):
            return jsonify({"error": "Missing or invalid Authorization header"}), 401

        token = auth_header.split(" ", 1)[1].strip()

        try:
            payload = decode_token(token, current_app.config["JWT_SECRET"])
        except Exception:
            return jsonify({"error": "Invalid or expired token"}), 401

        # guarda info do usuário para uso na rota, se quiser
        request.user = payload

        return fn(*args, **kwargs)

    return wrapper
