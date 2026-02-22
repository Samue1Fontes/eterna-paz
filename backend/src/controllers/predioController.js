import * as service from "../services/predioService.js";

export async function listar(req, res) {
  try {
    const dados = await service.listarPredios();
    res.json(dados);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao buscar prédios" });
  }
}

export async function criar(req, res) {
  try {
    const { nome, endereco } = req.body;

    if (!nome || !endereco) {
      return res.status(400).json({
        erro: "Nome e endereço obrigatórios",
      });
    }

    const predio = await service.criarPredio(nome, endereco);

    res.status(201).json(predio);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}