import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErro("");

    try {
      const res = await api.post("/auth/login", { login, senha });
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setErro(err?.erro || err?.message || "Erro ao efetuar login");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
        <h1 className="text-3xl font-extrabold mb-2 text-slate-900">Eterna Paz</h1>
        <p className="text-sm text-slate-500 mb-6">Acesse o painel administrativo</p>

        {erro && <div className="text-red-600 mb-3">{erro}</div>}

        <form onSubmit={onSubmit} className="space-y-4">
          <input
            placeholder="Usuário"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <input
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 hover:shadow-md transition cursor-pointer"
            >
              Entrar
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-4">Use: usuário <strong>admin</strong> / senha <strong>admin@123</strong></p>
        </form>
      </div>
    </div>
  );
}
