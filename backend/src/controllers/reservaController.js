import {
  criarReserva,
  atualizarReserva,
  listarReservas,
  removerReserva,
  buscarConvite as buscarConviteService,
} from "../services/reservaService.js";

/**
 * POST /reservas
 */
export const criar = async (req, res) => {
  try {
    const reserva = await criarReserva(req.body);

    return res.status(201).json(reserva);
  } catch (error) {
    console.error(error);

    return res.status(400).json({
      erro: error.message,
    });
  }
};

/**
 * GET /reservas
 */
export const listar = async (req, res) => {
  try {
    const reservas = await listarReservas();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

/**
 * GET /reservas/convite/:slug
 */
export const buscarConvite = async (req, res) => {
  try {
    const { slug } = req.params;

    const reserva = await buscarConviteService(slug);

    return res.json(reserva);
  } catch (error) {
    if (error.message === "Reserva não encontrada") {
      return res.status(404).json({ erro: error.message });
    }

    return res.status(400).json({ erro: error.message });
  }
};

/**
 * PUT /reservas/:id
 */
export const atualizar = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await atualizarReserva(
      id,
      req.body
    );

    res.json(reserva);
  } catch (error) {
    if (error.message === "Reserva não encontrada") {
      return res.status(404).json({
        erro: error.message,
      });
    }

    res.status(400).json({
      erro: error.message,
    });
  }
};

/**
 * DELETE /reservas/:id
 */
export const remover = async (req, res) => {
  try {
    const { id } = req.params;

    const reserva = await removerReserva(id);

    res.json({
      mensagem: "Reserva removida com sucesso",
      reserva,
    });
  } catch (error) {
    if (error.message === "Reserva não encontrada") {
      return res.status(404).json({ erro: error.message });
    }

    res.status(400).json({ erro: error.message });
  }
};