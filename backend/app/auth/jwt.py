import jwt
from datetime import datetime, timedelta

def create_token(user_id: int, email: str, secret: str, minutes: int = 120) -> str:
    """
    Gera um token JWT para autenticação de usuário, valido por um período especificado em minutos.
    
    """
    now = datetime.utcnow()
    
    payload = {
        "sub": str(user_id),
        "email": email,
        "iat": now,
        "exp": now + timedelta(minutes=minutes)
    }
    
    token = jwt.encode(payload, secret, algorithm="HS256")
    return token

def decode_token(token: str, secret: str) -> dict:
    """
    Decodifica um token JWT e retorna o payload.
    
    """
    return jwt.decode(token, secret, algorithms=["HS256"])

