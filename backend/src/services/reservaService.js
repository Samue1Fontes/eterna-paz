import {
  createReserva,
  findReservasByCapela,
  findBySlug,
  findById,
  findAllReservas,
  updateReserva,
  deleteReservaById,
} from "../repositories/reservaRepository.js";

import {
  PLANOS_DURACAO,
  INTERVALO_TECNICO_HORAS,
} from "../constants/reserva.constants.js";

import crypto from "crypto";


/**
 * Gera slug público
 */
const gerarSlug = () => {
  return crypto.randomBytes(6).toString("hex");
};

/**
 * Calcula data fim baseada no plano
 */
const calcularDataFim = (dataInicio, plano) => {
  if (!plano) return null;

  const horas = PLANOS_DURACAO[plano];

  if (!horas) {
    throw new Error("Plano de duração inválido");
  }

  const dataFim = new Date(dataInicio);
  dataFim.setHours(dataFim.getHours() + horas);

  return dataFim;
};

/**
 * Verifica conflito considerando intervalo técnico
 */
const validarConflitoHorario = (
  reservasExistentes,
  novoInicio,
  novoFim
) => {
  for (const reserva of reservasExistentes) {
    const inicioExistente = new Date(reserva.data_inicio);

    const fimExistente = new Date(reserva.data_fim);
    fimExistente.setHours(
      fimExistente.getHours() + INTERVALO_TECNICO_HORAS
    );

    const conflito =
      novoInicio < fimExistente &&
      novoFim > inicioExistente;

    if (conflito) {
      throw new Error(
        "Horário indisponível devido ao intervalo técnico."
      );
    }
  }
};

/**
 * Criar reserva
 */
export const criarReserva = async (dados) => {
  let {
    nome_falecido,
    nome_responsavel,
    telefone_responsavel,
    data_inicio,
    data_fim,
    plano,
    capela_id,
  } = dados;

  if (!data_inicio) {
    throw new Error("Data de início obrigatória");
  }

  const inicio = new Date(data_inicio);

  if (plano && !data_fim) {
    data_fim = calcularDataFim(inicio, plano);
  }

  if (!data_fim) {
    throw new Error("Data fim não informada");
  }

  const fim = new Date(data_fim);

  const reservasExistentes =
    await findReservasByCapela(capela_id);

  validarConflitoHorario(
    reservasExistentes,
    inicio,
    fim
  );

  const slug_convite = gerarSlug();

  return await createReserva({
    nome_falecido,
    nome_responsavel,
    telefone_responsavel,
    data_inicio: inicio,
    data_fim: fim,
    slug_convite,
    capela_id,
  });
};

/**
 * Listar reservas (admin)
 */
export const listarReservas = async () => {
  return await findAllReservas();
};

/**
 * Atualizar reserva
 */
export const atualizarReserva = async (id, dados) => {
  const reservaAtual = await findById(id);

  if (!reservaAtual) {
    throw new Error("Reserva não encontrada");
  }

  let {
    nome_falecido,
    nome_responsavel,
    telefone_responsavel,
    data_inicio,
    data_fim,
    plano,
    capela_id,
  } = dados;

  const inicio = data_inicio
    ? new Date(data_inicio)
    : new Date(reservaAtual.data_inicio);

  // Se plano for enviado, recalcula
  if (plano) {
    data_fim = calcularDataFim(inicio, plano);
  }

  const fim = data_fim
    ? new Date(data_fim)
    : new Date(reservaAtual.data_fim);

  const capelaFinal = capela_id || reservaAtual.capela_id;

  // Buscar reservas da capela
  const reservasExistentes =
    await findReservasByCapela(capelaFinal);

  // Remover a própria reserva da validação
  const reservasFiltradas = reservasExistentes.filter(
    (r) => r.id !== reservaAtual.id
  );

  validarConflitoHorario(
    reservasFiltradas,
    inicio,
    fim
  );

  return await updateReserva(id, {
    nome_falecido:
      nome_falecido || reservaAtual.nome_falecido,
    nome_responsavel:
      nome_responsavel || reservaAtual.nome_responsavel,
    telefone_responsavel:
      telefone_responsavel ||
      reservaAtual.telefone_responsavel,
    data_inicio: inicio,
    data_fim: fim,
    capela_id: capelaFinal,
  });
};

/**
 * Remover reserva
 */
export const removerReserva = async (id) => {
  const reserva = await deleteReservaById(id);

  if (!reserva) {
    throw new Error("Reserva não encontrada");
  }

  return reserva;
};

/**
 * Buscar convite público
 */
export const buscarConvite = async (slug) => {
  const reserva = await findBySlug(slug);

  if (!reserva) {
    throw new Error("Reserva não encontrada");
  }

  return reserva;
};