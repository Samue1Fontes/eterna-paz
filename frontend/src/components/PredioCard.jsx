import { Link } from "react-router-dom";

export default function PredioCard({ predio }) {
  return (
    <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              {predio.nome}
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              {predio.endereco}
            </p>
          </div>

          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
            Aberto
          </span>
        </div>

        <Link
          to={`/predios/${predio.id}/capelas`}
          className="inline-flex w-full items-center justify-center rounded-xl bg-blue-600 text-white py-2 font-medium hover:bg-blue-700 transition"
        >
          Gerenciar capelas
        </Link>
      </div>
    </div>
  );
}