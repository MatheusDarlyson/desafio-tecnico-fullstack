import hashlib
from flask import jsonify, current_app

from ..db import query_one
from ..auth.jwt import create_token


def _hash_password(password: str) -> str:
    """Gera uma SHA-256 da senha (mesmo padrao utilizado no MySQL)."""
    return hashlib.sha256(password.encode("utf-8")).hexdigest()


def login(data: dict):
    """Recebe credenciais de login e retorna um token JWT se forem válidas."""
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    
    
    if not email or not password:
        return jsonify({"error": "Email e senha são obrigatórios."}), 400
    
    user = query_one(
        "SELECT id,email AS email, password_hash FROM users WHERE email = %s", 
        (email,),
    )   
    
    
    if not user:
        return jsonify({"error": "Credenciais inválidas."}), 401    
    
    if _hash_password(password) != user["password_hash"]:
        return jsonify({"error": "Credenciais inválidas."}), 401    
    
    token = create_token(
        user_id=user["id"],
        email=email,
        secret=current_app.config["JWT_SECRET"],
        minutes=120,
    ) 
    
    return jsonify({
        "token": token,
        "user": {
            "id": user["id"],
            "email": user["email"],
        }
   }), 200      
    
    
    
    