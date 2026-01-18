from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os


from .config import Config  
from .db import init_db_pool, query_one
from .auth.decorators import require_auth

def create_app():
    load_dotenv(os.path.join(os.getcwd(), ".env")) # carrega variáveis de ambiente do arquivo .env
    
    app = Flask(__name__)
    app.config.from_object(Config)
        
    # Habilita CORS para permitir requisições de diferentes origens
    CORS(app)
    
    from .routes.auth_routes import auth_bp
    from .routes.carbono_ator_routes import carbono_ator_bp
    app.register_blueprint(auth_bp, url_prefix="/api")
    app.register_blueprint(carbono_ator_bp, url_prefix="/api")
    
    @app.before_request
    def before_request():
        init_db_pool(app)
    
    @app.get("/health")    
    def health():
        return {"status": "ok"}

    @app.get("/db-check")
    @require_auth
    def db_check():
        row = query_one("SELECT 1 AS OK;")
        return {"db": row}
    

    return app
