import * as capelaService from "../services/capelaService.js";

export const listar = async (req, res) => {
  try {
    const capelas = await capelaService.listarTodas();
    res.json(capelas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const criar = async (req, res) => {
  try {
    const { nome, predio_id } = req.body;

    const capela = await capelaService.criar(nome, predio_id);

    res.status(201).json(capela);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};

export const listarPorPredio = async (req, res) => {
  try {
    const { predio_id } = req.params;

    const capelas = await capelaService.listarPorPredio(predio_id);

    res.json(capelas);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
};

export const disponibilidade = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.query;

    if (!data) {
      return res
        .status(400)
        .json({ erro: "Data obrigatória" });
    }

    const resultado =
      await capelaService.obterDisponibilidade(
        id,
        data
      );

    res.json(resultado);
  } catch (error) {
    res.status(400).json({ erro: error.message });
  }
};