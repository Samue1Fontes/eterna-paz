import pool from "../config/database.js";

export const listarTodas = async () => {
  const result = await pool.query(`
    SELECT c.*, p.nome AS predio_nome
    FROM capelas c
    JOIN predios p ON p.id = c.predio_id
    ORDER BY c.id
  `);

  return result.rows;
};

export const criar = async (nome, predio_id) => {
  const result = await pool.query(
    `INSERT INTO capelas (nome, predio_id)
     VALUES ($1, $2)
     RETURNING *`,
    [nome, predio_id]
  );

  return result.rows[0];
};

export const listarPorPredio = async (predio_id) => {
  const result = await pool.query(
    `SELECT * FROM capelas
     WHERE predio_id = $1
     ORDER BY id`,
    [predio_id]
  );

  return result.rows;
};