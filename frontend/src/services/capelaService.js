import api from "./api";

/**
 * Lista capelas de um prédio
 */
export const listarCapelasPorPredio = async (predioId) => {
  const response = await api.get(`/capelas/predio/${predioId}`);
  return response.data;
};

/**
 * Buscar disponibilidade por data (admin)
 */
export const obterDisponibilidade = async (capelaId, data) => {
  const response = await api.get(
    `/capelas/${capelaId}/disponibilidade`,
    { params: { data } }
  );
  return response.data;
};