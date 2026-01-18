from flask import Blueprint, request
from ..auth.decorators import require_auth
from ..controllers.carbono_ator_controller import (
    list_carbono_atores,
    get_carbono_ator,
    create_carbono_ator,
    update_carbono_ator,
    delete_carbono_ator,
)

carbono_ator_bp = Blueprint("carbono_ator", __name__)

@carbono_ator_bp.get("/carbono-atores")
@require_auth
def list_route():
    return list_carbono_atores()

@carbono_ator_bp.get("/carbono-atores/<int:ator_id>")
@require_auth
def get_route(ator_id: int):
    return get_carbono_ator(ator_id)

@carbono_ator_bp.post("/carbono-atores")
@require_auth
def create_route():
    data = request.get_json(silent=True) or {}
    return create_carbono_ator(data)

@carbono_ator_bp.put("/carbono-atores/<int:ator_id>")
@require_auth
def update_route(ator_id: int):
    data = request.get_json(silent=True) or {}
    return update_carbono_ator(ator_id, data)

@carbono_ator_bp.delete("/carbono-atores/<int:ator_id>")
@require_auth
def delete_route(ator_id: int):
    return delete_carbono_ator(ator_id)
