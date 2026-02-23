import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarConvite } from "../services/reservaService";

export default function ConvitePublico() {
  const { slug } = useParams();
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setLoading(true);
        setErro("");
        const data = await buscarConvite(slug);
        setReserva(data);
      } catch (e) {
        console.error(e);
        setErro(e?.erro || e?.message || "Convite não encontrado");
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, [slug]);

  if (loading) return <p>Carregando...</p>;
  if (erro) return <div className="p-6 text-red-600">{erro}</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">
        {reserva.nome_falecido}
      </h1>

      <p><strong>Responsável:</strong> {reserva.nome_responsavel}</p>
      {reserva.telefone_responsavel && (
        <p><strong>Telefone:</strong> {reserva.telefone_responsavel}</p>
      )}
      <p>
        <strong>Início:</strong> {new Date(reserva.data_inicio).toLocaleString()}
      </p>
      <p>
        <strong>Fim:</strong> {new Date(reserva.data_fim).toLocaleString()}
      </p>

      {reserva.capela_nome && (
        <p><strong>Capela:</strong> {reserva.capela_nome}</p>
      )}

      {reserva.predio_nome && (
        <p><strong>Prédio:</strong> {reserva.predio_nome}</p>
      )}

      {reserva.predio_endereco && (
        <p><strong>Endereço:</strong> {reserva.predio_endereco}</p>
      )}

      <div className="mt-6">
        <a
          href="/"
          className="inline-block rounded-xl border px-4 py-2 hover:bg-slate-50 transition"
        >
          Voltar
        </a>
      </div>
    </div>
  );
}