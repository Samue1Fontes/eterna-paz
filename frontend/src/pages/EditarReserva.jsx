import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  buscarReservaPorId,
  atualizarReserva,
} from "../services/reservaService.js";

const PLANOS = [
  { value: "", label: "Não recalcular por plano" },
  { value: "BASICO", label: "Básico (3 horas)" },
  { value: "ESSENCIAL", label: "Essencial (6 horas)" },
  { value: "PADRAO", label: "Padrão (8 horas)" },
  { value: "ESTENDIDO", label: "Estendido (12 horas)" },
  { value: "VIGILIA", label: "Vigília (24 horas)" },
];

const PLANOS_DURACAO = {
  BASICO: 3,
  ESSENCIAL: 6,
  PADRAO: 8,
  ESTENDIDO: 12,
  VIGILIA: 24,
};

function toDatetimeLocal(value) {
  // value vem tipo "2026-03-10T18:00:00.000Z"
  // datetime-local precisa "YYYY-MM-DDTHH:mm"
  const d = new Date(value);
  const pad = (n) => String(n).padStart(2, "0");

  const year = d.getFullYear();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

export default function EditarReserva() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  const [form, setForm] = useState({
    nome_falecido: "",
    nome_responsavel: "",
    telefone_responsavel: "",
    data_inicio: "",
    data_fim: "",
    plano: "",
  capela_id: "",
  capela_nome: "",
  });

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  async function carregar() {
    try {
      setLoading(true);
      setErro("");

      const reserva = await buscarReservaPorId(id);

      setForm({
        nome_falecido: reserva.nome_falecido || "",
        nome_responsavel: reserva.nome_responsavel || "",
        telefone_responsavel: reserva.telefone_responsavel || "",
        data_inicio: reserva.data_inicio ? toDatetimeLocal(reserva.data_inicio) : "",
  data_fim: reserva.data_fim ? toDatetimeLocal(reserva.data_fim) : "",
        plano: "",
  capela_id: reserva.capela_id ? String(reserva.capela_id) : "",
  capela_nome: reserva.capela_nome || "",
      });
    } catch (e) {
      console.error(e);
      setErro(e?.erro || "Erro ao carregar reserva");
    } finally {
      setLoading(false);
    }
  }

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      // if data_inicio or plano changed, recalc data_fim locally when plano is selected
      if ((name === "data_inicio" || name === "plano") && next.plano) {
        try {
          const dur = PLANOS_DURACAO[next.plano];
          if (next.data_inicio) {
            const dt = new Date(next.data_inicio);
            dt.setHours(dt.getHours() + dur);
            const pad = (n) => String(n).padStart(2, "0");
            const year = dt.getFullYear();
            const month = pad(dt.getMonth() + 1);
            const day = pad(dt.getDate());
            const hours = pad(dt.getHours());
            const minutes = pad(dt.getMinutes());
            next.data_fim = `${year}-${month}-${day}T${hours}:${minutes}`;
          }
        } catch (e) {
          // ignore
        }
      }

      // format telefone as (11) 1 1111-1111 when typing
      if (name === "telefone_responsavel") {
        const digits = value.replace(/\D/g, "");
        let formatted = digits;
        if (digits.length > 0) formatted = `(${digits.slice(0,2)}) ${digits.slice(2,3)} ${digits.slice(3,7)}${digits.length>7?`-${digits.slice(7,11)}`:""}`;
        next.telefone_responsavel = formatted.trim();
      }

      return next;
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");

    if (!form.nome_falecido || !form.nome_responsavel || !form.data_inicio) {
      setErro("Preencha: nome do falecido, responsável e data/hora de início.");
      return;
    }

    // Se não mandar plano, data_fim é obrigatória
    if (!form.plano && !form.data_fim) {
      setErro("Informe a data/hora de término ou selecione um plano.");
      return;
    }

    try {
      setSalvando(true);

      const payload = {
        nome_falecido: form.nome_falecido,
        nome_responsavel: form.nome_responsavel,
        telefone_responsavel: form.telefone_responsavel,
        data_inicio: form.data_inicio,
        // se enviar plano, backend recalcula fim
        plano: form.plano || null,
        data_fim: form.plano ? null : form.data_fim,
        capela_id: form.capela_id ? Number(form.capela_id) : undefined,
      };

      await atualizarReserva(id, payload);

      alert("Reserva atualizada com sucesso!");
      navigate("/reservas");
    } catch (e) {
      console.error(e);
      setErro(e?.erro || "Erro ao atualizar reserva");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return <div className="bg-white border rounded-2xl p-6">Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Editar Reserva</h1>
          <p className="text-slate-600">Atualize os dados essenciais.</p>
        </div>

        <Link to="/reservas" className="text-slate-600 hover:text-slate-900">
          ← Voltar
        </Link>
      </div>

      <form onSubmit={onSubmit} className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        {erro && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3">
            {erro}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Nome do falecido *
            </label>
            <input
              name="nome_falecido"
              value={form.nome_falecido}
              onChange={onChange}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Nome do responsável *
            </label>
            <input
              name="nome_responsavel"
              value={form.nome_responsavel}
              onChange={onChange}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Telefone do responsável
            </label>
            <input
              name="telefone_responsavel"
              value={form.telefone_responsavel}
              onChange={onChange}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Capela
            </label>
            <input
              value={form.capela_nome || form.capela_id}
              readOnly
              className="w-full rounded-xl border px-3 py-2 bg-slate-50"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Data/hora de início *
            </label>
            <input
              type="datetime-local"
              name="data_inicio"
              value={form.data_inicio}
              onChange={onChange}
              className="w-full rounded-xl border px-3 py-2"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Plano (recalcular fim)
            </label>
            <select
              name="plano"
              value={form.plano}
              onChange={onChange}
              className="w-full rounded-xl border px-3 py-2 bg-white"
            >
              {PLANOS.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>

            <p className="text-xs text-slate-400">
              Se escolher plano, o backend recalcula a data fim automaticamente.
            </p>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">
              Data/hora de término {form.plano ? "(calculado)" : "*"}
            </label>
            <input
              type="datetime-local"
              name="data_fim"
              value={form.data_fim}
              onChange={onChange}
              className="w-full rounded-xl border px-3 py-2"
              disabled={!!form.plano}
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 pt-2">
          <button
            type="submit"
            disabled={salvando}
            className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition disabled:opacity-60"
          >
            {salvando ? "Salvando..." : "Salvar alterações"}
          </button>

          <Link
            to="/reservas"
            className="rounded-xl border px-4 py-2 text-center hover:bg-slate-50 transition"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}