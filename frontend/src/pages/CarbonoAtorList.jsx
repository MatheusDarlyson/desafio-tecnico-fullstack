import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { clearToken } from "../auth/auth";

export default function CarbonoAtorList() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    setError("");
    setLoading(true);

    try {
      const res = await api.get("/carbono-atores");
      // backend retorna lista direto
      setItems(res.data || []);
    } catch (err) {
      const status = err?.response?.status;
      const apiMsg = err?.response?.data?.error;

      if (status === 401) {
        clearToken();
        navigate("/login");
        return;
      }

      setError(apiMsg || "Erro ao carregar lista.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    const ok = window.confirm("Tem certeza que deseja excluir este registro?");
    if (!ok) return;

    try {
      await api.delete(`/carbono-atores/${id}`);
      await load();
    } catch (err) {
      const status = err?.response?.status;
      const apiMsg = err?.response?.data?.error;

      if (status === 401) {
        clearToken();
        navigate("/login");
        return;
      }

      alert(apiMsg || "Erro ao excluir.");
    }
  }

  useEffect(() => {
    document.body.className = "body";
    load();

    return () => {
      document.body.className = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="corpo">
      <div className="divnavigation">
        <div className="div-block">
          <div className="div-block-2">
            <div>LISTAGEM</div>
          </div>

          <img src="/CARBONO_ATOR_FORM_files/arrow_separaazul.png" alt="" />

          <div className="div-block-3">
            <div className="text-block-3">ATORES</div>
          </div>

          <img src="/CARBONO_ATOR_FORM_files/arrow_azul_rightazul.png" alt="" />
        </div>

        <Link className="voltar w-inline-block" to="/carbono-ator/novo">
          <img src="/CARBONO_ATOR_FORM_files/arrow_azul_leftazul.png" alt="" />
          <div className="bt_voltar">
            <div className="text-block-2">Novo</div>
          </div>
        </Link>
      </div>

      <div className="separator-breadcrumb border-top"></div>

      <div className="row caixa">
        <div className="col-md-12">
          <div className="mb-3">
            <div className="card-body">
              {loading && <div>Carregando...</div>}
              {error && <div className="text-danger">{error}</div>}

              {!loading && !error && (
                <div className="table-responsive">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Documento</th>
                        <th>Tipo</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th style={{ width: 180 }}>Ações</th>
                      </tr>
                    </thead>

                    <tbody>
                      {items.length === 0 ? (
                        <tr>
                          <td colSpan="7">Nenhum registro encontrado.</td>
                        </tr>
                      ) : (
                        items.map((it) => (
                          <tr key={it.id}>
                            <td>{it.id}</td>
                            <td>{it.nome}</td>
                            <td>{it.documento || "-"}</td>
                            <td>{it.tipo || "-"}</td>
                            <td>{it.email || "-"}</td>
                            <td>{it.telefone || "-"}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <Link
                                  className="btn btn-sm btn-outline-primary"
                                  to={`/carbono-ator/${it.id}`}
                                >
                                  Editar
                                </Link>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  type="button"
                                  onClick={() => handleDelete(it.id)}
                                >
                                  Excluir
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
