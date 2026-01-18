from flask import jsonify

from ..db import query_one, query_all, execute


ALLOWED_FIELDS = {"nome", "documento", "tipo", "email", "telefone"}


def list_carbono_atores():
    rows = query_all(
        "SELECT id, nome, documento, tipo, email, telefone, created_at, updated_at "
        "FROM carbono_ator ORDER BY id DESC"
    )
    return jsonify(rows), 200


def get_carbono_ator(ator_id: int):
    row = query_one(
        "SELECT id, nome, documento, tipo, email, telefone, created_at, updated_at "
        "FROM carbono_ator WHERE id = %s",
        (ator_id,),
    )
    if not row:
        return jsonify({"error": "Registro não encontrado"}), 404
    return jsonify(row), 200


def create_carbono_ator(data: dict):
    nome = (data.get("nome") or "").strip()
    if not nome:
        return jsonify({"error": "nome é obrigatório"}), 400

    documento = (data.get("documento") or "").strip() or None
    tipo = (data.get("tipo") or "").strip() or None
    email = (data.get("email") or "").strip().lower() or None
    telefone = (data.get("telefone") or "").strip() or None

    new_id = execute(
        "INSERT INTO carbono_ator (nome, documento, tipo, email, telefone) "
        "VALUES (%s, %s, %s, %s, %s)",
        (nome, documento, tipo, email, telefone),
    )

    return jsonify({"id": new_id, "message": "Criado com sucesso"}), 201


def update_carbono_ator(ator_id: int, data: dict):
    # garante que existe
    exists = query_one("SELECT id FROM carbono_ator WHERE id = %s", (ator_id,))
    if not exists:
        return jsonify({"error": "Registro não encontrado"}), 404

    # filtra apenas campos permitidos
    updates = {}
    for key, value in (data or {}).items():
        if key in ALLOWED_FIELDS:
            if value is None:
                updates[key] = None
            else:
                v = str(value).strip()
                if key == "email":
                    v = v.lower()
                updates[key] = v if v != "" else None

    if not updates:
        return jsonify({"error": "Nenhum campo válido para atualizar"}), 400

    # monta SQL dinâmico com segurança (valores parametrizados)
    set_clause = ", ".join([f"{k} = %s" for k in updates.keys()])
    params = tuple(updates.values()) + (ator_id,)

    execute(
        f"UPDATE carbono_ator SET {set_clause} WHERE id = %s",
        params,
    )

    return jsonify({"message": "Atualizado com sucesso"}), 200


def delete_carbono_ator(ator_id: int):
    exists = query_one("SELECT id FROM carbono_ator WHERE id = %s", (ator_id,))
    if not exists:
        return jsonify({"error": "Registro não encontrado"}), 404

    execute("DELETE FROM carbono_ator WHERE id = %s", (ator_id,))
    return jsonify({"message": "Removido com sucesso"}), 200
