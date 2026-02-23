import api from "./api";

/**
 * Criar reserva
 */
export const criarReserva = async (dados) => {
  const response = await api.post("/reservas", dados);
  return response.data;
};

/**
 * Listar reservas
 */
export const listarReservas = async () => {
  const response = await api.get("/reservas");
  return response.data;
};

/**
 * Atualizar reserva
 */
export const atualizarReserva = async (id, dados) => {
  const response = await api.put(`/reservas/${id}`, dados);
  return response.data;
};

/**
 * Deletar reserva
 */
export const removerReserva = async (id) => {
  const response = await api.delete(`/reservas/${id}`);
  return response.data;
};

/**
 * Buscar convite público
 */
export const buscarConvite = async (slug) => {
  const response = await api.get(`/reservas/convite/${slug}`);
  return response.data;
};

/**
 * Buscar reserva por ID
 */
export const buscarReservaPorId = async (id) => {
  const response = await api.get(`/reservas/${id}`);
  return response.data;
};