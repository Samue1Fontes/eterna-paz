import { useEffect, useState } from "react";
import { listarPredios } from "../services/predioService.js";
import PredioCard from "../components/PredioCard.jsx";

export default function Home() {
  const [predios, setPredios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPredios();
  }, []);

  async function carregarPredios() {
    try {
      const data = await listarPredios();
      setPredios(data);
    } catch (error) {
      console.error(error);
      alert("Erro ao carregar prédios");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Prédios</h1>
        <p className="text-slate-600 mt-1">
          Selecione um prédio para gerenciar as capelas.
        </p>
      </div>

      {loading ? (
        <div className="bg-white border rounded-2xl p-6">
          Carregando...
        </div>
      ) : predios.length === 0 ? (
        <div className="bg-white border rounded-2xl p-6">
          <p className="text-slate-700 font-medium">Nenhum prédio cadastrado.</p>
          <p className="text-slate-500 text-sm mt-1">
            Cadastre prédios no backend (POST /predios) para aparecer aqui.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {predios.map((predio) => (
            <PredioCard key={predio.id} predio={predio} />
          ))}
        </div>
      )}
    </div>
  );
}