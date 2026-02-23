import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  [
    "px-3 py-2 rounded-lg text-sm font-medium transition",
    isActive
      ? "bg-slate-900 text-white"
      : "text-slate-700 hover:bg-slate-100",
  ].join(" ");

export default function Navbar() {
  return (
    <header className="bg-white border-b">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="font-bold text-slate-900">Eterna Paz</span>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Reservas de Capelas
          </span>
        </NavLink>

        <nav className="flex items-center gap-2">
          <NavLink to="/" className={linkClass}>
            Início
          </NavLink>

          <NavLink to="/reservas" className={linkClass}>
            Reservas
          </NavLink>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className="ml-2 px-3 py-2 rounded-lg text-sm font-medium bg-red-100 text-red-700 hover:bg-red-200 cursor-pointer"
          >
            Sair
          </button>
        </nav>
      </div>
    </header>
  );
}