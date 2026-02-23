import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import NovaReserva from "../pages/NovaReserva";
import EditarReserva from "../pages/EditarReserva";
import ConvitePublico from "../pages/ConvitePublico";
import Capelas from "../pages/Capelas";
import Reservas from "../pages/Reservas";
import Login from "../pages/Login";
import { Navigate } from "react-router-dom";

function AuthWrapper({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* ROTAS ADMIN */}
        <Route
          path="/"
          element={
            <AuthWrapper>
              <Layout>
                <Home />
              </Layout>
            </AuthWrapper>
          }
        />

        <Route
          path="/nova-reserva"
          element={
            <AuthWrapper>
              <Layout>
                <NovaReserva />
              </Layout>
            </AuthWrapper>
          }
        />

        <Route
          path="/editar/:id"
          element={
            <AuthWrapper>
              <Layout>
                <EditarReserva />
              </Layout>
            </AuthWrapper>
          }
        />

        {/* ROTA PÚBLICA (SEM NAVBAR) */}
        <Route
          path="/convite/:slug"
          element={<ConvitePublico />}
        />
        <Route
          path="/predios/:id/capelas"
          element={
            <AuthWrapper>
              <Layout>
                <Capelas />
              </Layout>
            </AuthWrapper>
          }
        />
        <Route
          path="/reservas"
          element={
            <AuthWrapper>
              <Layout>
                <Reservas />
              </Layout>
            </AuthWrapper>
          }
        />

        {/* admin view of convite */}
        <Route
          path="/convite-admin/:slug"
          element={
            <AuthWrapper>
              <Layout>
                <ConvitePublico />
              </Layout>
            </AuthWrapper>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}