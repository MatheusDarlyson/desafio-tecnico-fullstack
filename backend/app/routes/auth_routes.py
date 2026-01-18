from flask import Blueprint, request
from ..controllers.auth_controller import login

auth_bp = Blueprint("auth", __name__)

@auth_bp.post("/login")
def login_route():
    data = request.get_json(silent=True) or {}
    return login(data) 