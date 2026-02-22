import pool from "../config/database.js";

export async function buscarTodos() {
  const result = await pool.query(
    "SELECT * FROM predios ORDER BY id"
  );
  return result.rows;
}

export async function criar(nome, endereco) {
  const result = await pool.query(
    `INSERT INTO predios (nome, endereco)
     VALUES ($1,$2)
     RETURNING *`,
    [nome, endereco]
  );

  return result.rows[0];
}