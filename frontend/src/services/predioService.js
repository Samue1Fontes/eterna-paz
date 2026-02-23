import api from "./api.js";

export const listarPredios = async () => {
  const response = await api.get("/predios");
  return response.data;
};