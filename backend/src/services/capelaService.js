import * as repository from "../repositories/capelaRepository.js";
import { findReservasByCapelaAndDate } from "../repositories/reservaRepository.js";
import { INTERVALO_TECNICO_HORAS } from "../constants/reserva.constants.js";

export const listarTodas = async () => {
  return await repository.listarTodas();
};

export const criar = async (nome, predio_id) => {
  if (!nome || !predio_id) {
    throw new Error("Nome e prédio são obrigatórios");
  }

  return await repository.criar(nome, predio_id);
};

export const listarPorPredio = async (predio_id) => {
  return await repository.listarPorPredio(predio_id);
};

/**
 * Obter disponibilidade
 */
export const obterDisponibilidade = async (
  capelaId,
  data
) => {
  const reservas =
    await findReservasByCapelaAndDate(capelaId, data);

  let proximoHorario = "Livre";

  if (reservas.length > 0) {
    const ultimaReserva =
      reservas[reservas.length - 1];

    const fim = new Date(ultimaReserva.data_fim);

    fim.setHours(fim.getHours() + INTERVALO_TECNICO_HORAS);

    proximoHorario = fim.toTimeString().slice(0, 5);
  }

  return {
    data,
    reservas: reservas.map((r) => ({
      inicio: new Date(r.data_inicio)
        .toTimeString()
        .slice(0, 5),
      fim: new Date(r.data_fim)
        .toTimeString()
        .slice(0, 5),
    })),
    proximo_horario_disponivel: proximoHorario,
  };
};