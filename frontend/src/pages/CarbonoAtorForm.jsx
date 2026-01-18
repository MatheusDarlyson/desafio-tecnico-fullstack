import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/api";
import { clearToken } from "../auth/auth";

export default function CarbonoAtorForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    nome: "",
    documento: "",
    tipo: "PJ",
    email: "",
    telefone: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function loadById(atorId) {
    try {
      const res = await api.get(`/carbono-atores/${atorId}`);
      setForm({
        nome: res.data.nome || "",
        documento: res.data.documento || "",
        tipo: res.data.tipo || "PJ",
        email: res.data.email || "",
        telefone: res.data.telefone || "",
      });
    } catch (err) {
      const status = err?.response?.status;
      if (status === 401) {
        clearToken();
        navigate("/login");
        return;
      }
      alert("Erro ao carregar registro.");
      navigate("/carbono-ator");
    }
  }

  useEffect(() => {
    document.body.className = "body";

    if (isEdit) {
      loadById(id);
    }

    return () => {
      document.body.className = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    try {
      if (isEdit) {
        await api.put(`/carbono-atores/${id}`, form);
        setMsg("Atualizado com sucesso!");
      } else {
        const res = await api.post("/carbono-atores", form);
        setMsg(`Criado com sucesso! ID: ${res.data.id}`);

        // limpa o form após criar
        setForm({
          nome: "",
          documento: "",
          tipo: "PJ",
          email: "",
          telefone: "",
        });
      }
    } catch (err) {
      const status = err?.response?.status;
      const apiMsg = err?.response?.data?.error;

      if (status === 401) {
        clearToken();
        navigate("/login");
        return;
      }

      setError(apiMsg || "Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="corpo">
      {/* Breadcrumb / Navegação do topo */}
      <div className="divnavigation">
        <div className="div-block">
          <div className="div-block-2">
            <div>{isEdit ? "EDIÇÃO" : "INCLUSÃO"}</div>
          </div>

          <img src="/CARBONO_ATOR_FORM_files/arrow_separaazul.png" alt="" />

          <div className="div-block-3">
            <div className="text-block-3">ATOR</div>
          </div>

          <img src="/CARBONO_ATOR_FORM_files/arrow_azul_rightazul.png" alt="" />
        </div>

        <a
          className="voltar w-inline-block"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate("/carbono-ator");
          }}
        >
          <img src="/CARBONO_ATOR_FORM_files/arrow_azul_leftazul.png" alt="" />
          <div className="bt_voltar">
            <div className="text-block-2">Voltar</div>
          </div>
        </a>
      </div>

      <div className="separator-breadcrumb border-top"></div>

      {/* Caixa do formulário */}
      <div className="row caixa">
        <div className="col-md-12">
          <div className="mb-3">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row caixa">
                  <div className="col-md-9 form-group mx-1">
                    <label className="text-primary">NOME (*)</label>
                    <input
                      className="text-field-2 w-input col-md-12"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      maxLength={100}
                      type="text"
                      placeholder="Informe o nome"
                      required
                    />
                  </div>

                  <div className="col-md-4 form-group mx-1">
                    <label className="text-primary">DOCUMENTO</label>
                    <input
                      className="text-field-2 w-input col-md-12"
                      name="documento"
                      value={form.documento}
                      onChange={handleChange}
                      maxLength={20}
                      type="text"
                      placeholder="CPF/CNPJ"
                    />
                  </div>

                  <div className="col-md-4 form-group mx-1">
                    <label className="text-primary">TIPO</label>
                    <select
                      className="text-field-2 w-input col-md-12"
                      name="tipo"
                      value={form.tipo}
                      onChange={handleChange}
                    >
                      <option value="PJ">PJ</option>
                      <option value="PF">PF</option>
                    </select>
                  </div>

                  <div className="col-md-4 form-group mx-1">
                    <label className="text-primary">EMAIL</label>
                    <input
                      className="text-field-2 w-input col-md-12"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      maxLength={120}
                      type="email"
                      placeholder="contato@empresa.com"
                    />
                  </div>

                  <div className="col-md-4 form-group mx-1">
                    <label className="text-primary">TELEFONE</label>
                    <input
                      className="text-field-2 w-input col-md-12"
                      name="telefone"
                      value={form.telefone}
                      onChange={handleChange}
                      maxLength={20}
                      type="text"
                      placeholder="(00) 90000-0000"
                    />
                  </div>

                  <div className="col-md-12 my-3">
                    {error && <div className="text-danger">{error}</div>}
                    {msg && <div className="text-success">{msg}</div>}
                  </div>

                  <div className="col-md-12">
                    <input
                      className="button-3 w-button"
                      type="submit"
                      value={
                        loading
                          ? "SALVANDO..."
                          : isEdit
                          ? "ATUALIZAR"
                          : "SALVAR"
                      }
                      disabled={loading}
                    />
                  </div>
                </div>
              </form>

              {/* botão opcional para voltar à lista */}
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => navigate("/carbono-ator")}
                >
                  Voltar para listagem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
