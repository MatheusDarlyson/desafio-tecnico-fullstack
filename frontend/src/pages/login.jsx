import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { setToken } from "../auth/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("admin@teste.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/login", { email, password });
      setToken(res.data.token);
      navigate("/carbono-ator/novo");
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        "Não foi possível fazer login. Verifique email/senha.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "40px auto", padding: 16 }}>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>Email</label>
          <input
            style={{ width: "100%", padding: 8 }}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Senha</label>
          <input
            style={{ width: "100%", padding: 8 }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="sua senha"
          />
        </div>

        {error && (
          <div style={{ marginBottom: 12, color: "red" }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{ width: "100%", padding: 10 }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}
