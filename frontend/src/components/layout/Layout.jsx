import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-6xl mx-auto px-4 py-4 text-xs text-slate-500">
          Eterna Paz • MVP — Sistema de Reserva de Capelas
        </div>
      </footer>
    </div>
  );
}