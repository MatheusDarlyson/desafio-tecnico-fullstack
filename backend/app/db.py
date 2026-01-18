from mysql.connector import pooling

_pool = None

def init_db_pool(app):
    """Inicializa o pool de conexões com o banco de dados MySQL.
    Deve ser chamado uma vez ao iniciar a aplicação.
    """ 
    global _pool
    if _pool is None:
        _pool = pooling.MySQLConnectionPool(
            pool_name="app_pool",
            pool_size=5,
            host=app.config["DB_HOST"],
            port=app.config["DB_PORT"],
            user=app.config["DB_USER"],
            password=app.config["DB_PASSWORD"],
            database=app.config["DB_NAME"],
    )
    
def get_conn(): 
    """Obtém uma conexão do pool de conexões."""
    if _pool is None:
        raise RuntimeError("O pool de conexões não foi inicializado. Chame init_db_pool primeiro.")
    return _pool.get_connection()

def query_one(sql: str, params: tuple = ()):
    """Executa uma consulta SQL e retorna um único resultado."""
    conn = get_conn()
    try:
        cur = conn.cursor(dictionary=True)
        cur.execute(sql, params) #parametros para evitar SQL injection
        return cur.fetchone()
    finally:
        conn.close()  # Fecha a conexão após o uso
    
def query_all(sql: str, params: tuple = ()):
    """Executa um SELECET e retorna os resultados de (list[dict])."""
    conn = get_conn()
    try:
        cur = conn.cursor(dictionary=True)
        cur.execute(sql, params)  # parametros para evitar SQL injection
        return cur.fetchall()
    finally:
        conn.close()  # Fecha a conexão após o uso

def execute(sql: str, params: tuple = ()):
    """Executa INSERT/UPDATE/DELETE. Retorna lastrowid (útil para INSERT)."""
    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute(sql, params)  # parametros para evitar SQL injection
        conn.commit()
        return cur.lastrowid
    finally:
        conn.close()  # Fecha a conexão após o uso
        
          
          
          
          