# Desafio Técnico Fullstack (Flask + React + MySQL)

Projeto desenvolvido como **desafio técnico para vaga de Desenvolvedor Fullstack**, com foco em organização, clareza de setup, validações corretas e facilidade de avaliação.

O objetivo é permitir que qualquer avaliador consiga **rodar o projeto do zero**, sem configurações implícitas ou passos manuais não documentados.

---

## 🧰 Stack

- **Backend:** Python + Flask
- **Frontend:** React (Vite)
- **Banco de Dados:** MySQL
- **Autenticação:** JWT

---

## 📁 Estrutura do Projeto

```
/
├── backend/
├── frontend/
├── schema.sql
└── README.md
```

---

## ✅ Requisitos

- **Python:** 3.10+
- **Node.js:** 18+
- **MySQL:** 8+

---

## 🗄️ Banco de Dados (MySQL)

### 1) Criar o banco
```sql
CREATE DATABASE desafio_fullstack;
```

### 2) Executar o schema
- Abra o arquivo `schema.sql` (na **raiz do projeto**)
- Execute o script no banco `desafio_fullstack`

> O script cria todas as tabelas necessárias **e insere automaticamente um usuário de teste** para facilitar a avaliação.

### 👤 Usuário de teste
- **Email:** `admin@teste.com`
- **Senha:** `123456`

---

## 🔧 Backend (Flask)

### 1) Acesse a pasta
```bash
cd backend
```

### 2) Crie e ative o ambiente virtual

**Windows (PowerShell):**
```bash
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3) Instale as dependências
```bash
pip install -r requirements.txt
```

### 4) Rodar o servidor

> ⚠️ **Importante**  
> Não utilize `flask run` neste projeto.  
> Esse comando pode subir um app diferente e resultar em **404** nas rotas `/health` e `/api/*`.

Utilize sempre o entrypoint do projeto:

```bash
python run.py
```

### Endpoints principais

API base:
```text
http://127.0.0.1:5000/api
```

Health check:
```text
http://127.0.0.1:5000/health
```

---

## 🌐 Frontend (React)

### 1) Acesse a pasta
```bash
cd frontend
```

### 2) Instale as dependências
```bash
npm install
```

---

### Configuração de ambiente

O frontend utiliza uma variável de ambiente para definir a URL da API.

Crie um arquivo `.env` na pasta `frontend` com o seguinte conteúdo:

```env
VITE_API_URL=http://127.0.0.1:5000/api
```

> O Vite carrega variáveis de ambiente **apenas no momento do start**.  
> Sempre reinicie o frontend após alterar o `.env`.

Um arquivo `.env.example` é fornecido como referência.

---

### 3) Rodar a aplicação
```bash
npm run dev
```

A aplicação estará disponível em:
```text
http://localhost:5173
```

---

## 🔐 Autenticação

- Autenticação baseada em **JWT**
- O token é gerado no login
- Todas as rotas protegidas exigem token válido no header `Authorization`

Exemplo:
```text
Authorization: Bearer <token>
```

---

## 🧪 Fluxo recomendado para avaliação

1. Criar o banco de dados
2. Executar `schema.sql`
3. Subir o backend com `python run.py`
4. Validar `/health`
5. Realizar login (`admin@teste.com` / `123456`)
6. Subir o frontend
7. Utilizar a aplicação normalmente

---

## 🧠 Regras e validações implementadas

- Validação de campos obrigatórios no backend
- Alinhamento entre validações da API e constraints do banco
- Autenticação obrigatória via JWT
- Estrutura REST padronizada para CRUD
- Frontend desacoplado e consumindo API via variável de ambiente

---

## ℹ️ Observações técnicas

- A senha é armazenada usando **SHA-256**, considerando o contexto de desafio técnico.
- O projeto prioriza clareza, previsibilidade e facilidade de execução.
- Estrutura pensada para avaliação técnica e leitura de código.

---

## 📌 Considerações finais

Este projeto foi estruturado para evitar ambiguidades no setup e permitir uma avaliação objetiva, desde a criação do banco até o uso completo da aplicação.

