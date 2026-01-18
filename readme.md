# Desafio Fullstack (Flask + React + MySQL)

Projeto desenvolvido como desafio prático para a vaga de Desenvolvedor(a) Fullstack.

## Stack
- Backend: Python + Flask
- Frontend: React (Vite)
- Banco: MySQL
- Autenticação: JWT

---

## Estrutura
```

/
backend/
frontend/
schema.sql

````

---

## Requisitos
- Python 3.10+ (ou 3.11)
- Node 18+
- MySQL 8+

---

## Banco de Dados (MySQL)
1. Crie o banco e tabelas usando o script:

- Abra o `schema.sql` no MySQL Workbench e execute.

---

## Backend (Flask)
1. Acesse a pasta:
```bash
cd backend
````

2. Crie e ative o venv:

```bash
python -m venv .venv
# Windows
.\.venv\Scripts\Activate.ps1
```

3. Instale dependências:

```bash
pip install -r requirements.txt
```

4. Crie o arquivo `.env` em `backend/` (exemplo):

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=root
DB_NAME=desafio_fullstack

JWT_SECRET=super_secret_key
```

5. Rode o servidor:

```bash
py run.py
```

API base:

* [http://127.0.0.1:5000/api](http://127.0.0.1:5000/api)

---

## Frontend (React)

1. Acesse a pasta:

```bash
cd frontend
```

2. Instale dependências:

```bash
npm install
```

3. Rode o projeto:

```bash
npm run dev
```

Frontend:

* [http://localhost:5173](http://localhost:5173)

---

## Rotas principais

### Auth

* `POST /api/login`

  * body: `{ "email": "...", "password": "..." }`

### Carbono Ator (protegido por JWT)

* `GET /api/carbono-atores`
* `GET /api/carbono-atores/:id`
* `POST /api/carbono-atores`
* `PUT /api/carbono-atores/:id`
* `DELETE /api/carbono-atores/:id`

---

## Observações

* O frontend utiliza os arquivos de CSS/JS fornecidos no desafio (pasta `public/`).
* O token JWT é armazenado no `localStorage`.

```


