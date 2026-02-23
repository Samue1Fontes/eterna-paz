import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listarReservas, removerReserva } from "../services/reservaService.js";

export default function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  async function carregar() {
    try {
      setLoading(true);
      const data = await listarReservas();
      setReservas(data);
    } catch (e) {
      console.error(e);
      alert("Erro ao carregar reservas");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregar();
  }, []);

  async function excluir(id) {
    const ok = confirm("Deseja remover esta reserva?");
    if (!ok) return;

    try {
      await removerReserva(id);
      await carregar();
    } catch (e) {
      console.error(e);
      alert(e?.erro || "Erro ao remover reserva");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Reservas</h1>
          <p className="text-slate-600">Visão administrativa das reservas.</p>
        </div>

        <Link
          to="/"
          className="rounded-xl border px-4 py-2 hover:bg-slate-50 transition"
        >
          Voltar
        </Link>
      </div>

      {loading ? (
        <div className="bg-white border rounded-2xl p-6">Carregando...</div>
      ) : reservas.length === 0 ? (
        <div className="bg-white border rounded-2xl p-6">
          Nenhuma reserva cadastrada.
        </div>
      ) : (
        <div className="bg-white border rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3">Falecido</th>
                <th className="text-left px-4 py-3">Responsável</th>
                <th className="text-left px-4 py-3">Prédio</th>
                <th className="text-left px-4 py-3">Sala / Capela</th>
                <th className="text-left px-4 py-3">Início</th>
                <th className="text-left px-4 py-3">Fim</th>
                <th className="text-left px-4 py-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {reservas.map((r) => (
                <tr key={r.id} className="border-t">
                    <td className="px-4 py-3 font-medium">{r.nome_falecido}</td>
                    <td className="px-4 py-3">{r.nome_responsavel}</td>
                    <td className="px-4 py-3">{r.predio || r.predio_nome}</td>
                    <td className="px-4 py-3">{r.capela || r.capela_nome}</td>
                    <td className="px-4 py-3">
                      {new Date(r.data_inicio).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      {new Date(r.data_fim).toLocaleString()}
                    </td>

                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        to={`/editar/${r.id}`}
                        className="rounded-lg border px-3 py-1 hover:bg-slate-50"
                      >
                        Editar
                      </Link>

                      <Link
                        to={`/convite-admin/${r.slug_convite}`}
                        className="rounded-lg border px-3 py-1 hover:bg-slate-50"
                      >
                        Convite
                      </Link>

                      <button
                        onClick={() => excluir(r.id)}
                        className="rounded-lg bg-red-600 text-white px-3 py-1 hover:bg-red-700"
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}