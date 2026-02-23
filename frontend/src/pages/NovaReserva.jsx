import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { criarReserva } from "../services/reservaService";

const PLANOS = [
  { value: "", label: "Sem plano (informar manualmente)" },
  { value: "BASICO", label: "Básico (3 horas)" },
  { value: "ESSENCIAL", label: "Essencial (6 horas)" },
  { value: "PADRAO", label: "Padrão (8 horas)" },
  { value: "ESTENDIDO", label: "Estendido (12 horas)" },
  { value: "VIGILIA", label: "Vigília (24 horas)" },
];

export default function NovaReserva() {
  const location = useLocation();

  const query = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const capela_id = query.get("capela_id");
  const predio_id = query.get("predio_id");
  const capela_nome = query.get("capela_nome");

  const [form, setForm] = useState({
    nome_falecido: "",
    nome_responsavel: "",
    telefone_responsavel: "",
    data_inicio: "",
    plano: "",
    data_fim: "",
  });

  const PLANOS_DURACAO = {
    BASICO: 3,
    ESSENCIAL: 6,
    PADRAO: 8,
    ESTENDIDO: 12,
    VIGILIA: 24,
  };

  const [loading, setLoading] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState("");

  const linkConvite = resultado?.slug_convite
    ? `${window.location.origin}/convite/${resultado.slug_convite}`
    : "";

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => {
      const next = { ...prev, [name]: value };

      if ((name === "data_inicio" || name === "plano") && next.plano) {
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
      }

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

    if (!capela_id) {
      setErro("Capela não informada. Volte e selecione uma capela.");
      return;
    }

    if (!form.nome_falecido || !form.nome_responsavel || !form.data_inicio) {
      setErro("Preencha: nome do falecido, responsável e data/hora de início.");
      return;
    }

    // Se plano não for escolhido, data_fim vira obrigatório
    if (!form.plano && !form.data_fim) {
      setErro("Sem plano: você precisa informar a data/hora de término.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        nome_falecido: form.nome_falecido,
        nome_responsavel: form.nome_responsavel,
        telefone_responsavel: form.telefone_responsavel,
        data_inicio: form.data_inicio,
        plano: form.plano || null,
        data_fim: form.plano ? null : form.data_fim,
        capela_id: Number(capela_id),
      };

      const res = await criarReserva(payload);
      setResultado(res);
    } catch (err) {
      // se você configurou interceptor, pode vir {erro: "..."}
      const msg = err?.erro || err?.message || "Erro ao criar reserva";
      setErro(msg);
    } finally {
      setLoading(false);
    }
  }

  async function copiarLink() {
    try {
      await navigator.clipboard.writeText(linkConvite);
      alert("Link copiado com sucesso!");
    } catch {
      alert("Não foi possível copiar automaticamente. Copie manualmente.");
    }
  }

  function abrirWhatsApp() {
    if (!resultado?.telefone_responsavel) {
      alert("Telefone do responsável não informado.");
      return;
    }

    // WhatsApp precisa de número com DDI (55) e só dígitos
    const telefone = resultado.telefone_responsavel.replace(/\D/g, "");
    const numero = telefone.startsWith("55") ? telefone : `55${telefone}`;

    const mensagem = encodeURIComponent(
      `Olá, segue o link com as informações do velório:\n\n${linkConvite}\n\nEterna Paz`
    );

    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
  }

  // Tela de sucesso (simples e bem útil)
  if (resultado) {
    return (
      <div className="space-y-6">
        <div className="bg-white border rounded-2xl p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            ✅ Reserva criada com sucesso
          </h1>

          <div className="mt-4 grid gap-2 text-slate-700">
            <p><span className="font-semibold">Falecido:</span> {resultado.nome_falecido}</p>
            <p><span className="font-semibold">Responsável:</span> {resultado.nome_responsavel}</p>
            <p>
              <span className="font-semibold">Início:</span>{" "}
              {new Date(resultado.data_inicio).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Fim:</span>{" "}
              {new Date(resultado.data_fim).toLocaleString()}
            </p>
          </div>

          <div className="mt-6 space-y-2">
            <label className="text-sm font-medium text-slate-700">
              Link público do convite
            </label>

            <div className="flex flex-col md:flex-row gap-2">
              <input
                className="w-full rounded-xl border px-3 py-2"
                value={linkConvite}
                readOnly
              />

              <button
                type="button"
                onClick={copiarLink}
                className="rounded-xl bg-slate-900 text-white px-4 py-2 hover:bg-black transition"
              >
                Copiar link
              </button>
            </div>

            <div className="flex flex-col md:flex-row gap-2 pt-2">
              <button
                type="button"
                onClick={abrirWhatsApp}
                className="rounded-xl bg-emerald-600 text-white px-4 py-2 hover:bg-emerald-700 transition"
              >
                Enviar por WhatsApp
              </button>

              <Link
                to={`/convite/${resultado.slug_convite}`}
                className="rounded-xl border px-4 py-2 text-center hover:bg-slate-50 transition"
              >
                Ver convite
              </Link>

              <Link
                to="/"
                className="rounded-xl border px-4 py-2 text-center hover:bg-slate-50 transition"
              >
                Voltar
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Formulário
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Nova Reserva
          </h1>
          <p className="text-slate-500">
            Preencha os dados essenciais e salve a reserva.
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Capela selecionada: {capela_nome || "não informada"}
          </p>
        </div>

        <Link
          to={predio_id ? `/predios/${predio_id}/capelas` : "/"}
          className="text-slate-600 hover:text-slate-900"
        >
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
              placeholder="Ex: José da Silva"
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
              placeholder="Ex: Maria da Silva"
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
              placeholder="Ex: 84999999999"
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
              Plano de duração
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
              Se escolher um plano, o sistema calcula o término automaticamente.
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

            {form.plano && (
              <p className="text-xs text-slate-400">
                Com plano, você não precisa informar o fim.
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-2 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Salvando..." : "Salvar reserva"}
          </button>

          <Link
            to={predio_id ? `/predios/${predio_id}/capelas` : "/"}
            className="rounded-xl border px-4 py-2 text-center hover:bg-slate-50 transition"
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}