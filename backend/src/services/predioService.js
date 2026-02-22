import * as repository from "../repositories/predioRepository.js";

export async function listarPredios() {
  return await repository.buscarTodos();
}

export async function criarPredio(nome, endereco) {
  return await repository.criar(nome, endereco);
}