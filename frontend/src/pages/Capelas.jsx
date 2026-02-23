import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { listarCapelasPorPredio } from "../services/capelaService";

export default function Capelas() {
  const { id } = useParams(); // id do prédio
  const [capelas, setCapelas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarCapelas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function carregarCapelas() {
    try {
      setLoading(true);
      const data = await listarCapelasPorPredio(id);
      setCapelas(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar capelas");
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Capelas
          </h1>
          <p className="text-slate-500">
            Selecione uma capela para criar uma reserva.
          </p>
        </div>

        <Link
          to="/"
          className="text-slate-600 hover:text-slate-900"
        >
          ← Voltar
        </Link>
      </div>

      {capelas.length === 0 ? (
        <p className="text-slate-500">
          Nenhuma capela cadastrada para este prédio.
        </p>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600">
              <tr>
                <th className="text-left px-4 py-3">Capela</th>
                <th className="text-left px-4 py-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {capelas.map((capela) => (
                <tr
                  key={capela.id}
                  className="border-t"
                >
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {capela.nome}
                  </td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/nova-reserva?capela_id=${capela.id}&predio_id=${id}&capela_nome=${encodeURIComponent(capela.nome)}`}
                      className="inline-flex items-center justify-center rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition"
                    >
                      Reservar
                    </Link>
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