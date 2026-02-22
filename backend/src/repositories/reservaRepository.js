import pool from "../config/database.js";

/**
 * Criar reserva
 */
export const createReserva = async (reserva) => {
  const query = `
    INSERT INTO reservas (
      nome_falecido,
      nome_responsavel,
      telefone_responsavel,
      data_inicio,
      data_fim,
      slug_convite,
      capela_id
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7)
    RETURNING *;
  `;

  const values = [
    reserva.nome_falecido,
    reserva.nome_responsavel,
    reserva.telefone_responsavel,
    reserva.data_inicio,
    reserva.data_fim,
    reserva.slug_convite,
    reserva.capela_id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Listar reservas por capela
 */
export const findReservasByCapela = async (capelaId) => {
  const query = `
    SELECT *
    FROM reservas
    WHERE capela_id = $1
    ORDER BY data_inicio;
  `;

  const result = await pool.query(query, [capelaId]);
  return result.rows;
};

/**
 * Buscar reserva pelo slug (link público)
 */
export const findBySlug = async (slug) => {
  const query = `
    SELECT
      r.id,
      r.nome_falecido,
      r.nome_responsavel,
      r.telefone_responsavel,
      r.data_inicio,
      r.data_fim,
      r.slug_convite,
      c.nome AS capela_nome,
      p.nome AS predio_nome,
      p.endereco AS predio_endereco
    FROM reservas r
    JOIN capelas c ON c.id = r.capela_id
    JOIN predios p ON p.id = c.predio_id
    WHERE r.slug_convite = $1
  `;

  const result = await pool.query(query, [slug]);
  return result.rows[0];
};

export const findReservasByCapelaAndDate = async (
  capelaId,
  data
) => {
  const query = `
    SELECT data_inicio, data_fim
    FROM reservas
    WHERE capela_id = $1
      AND DATE(data_inicio) = $2
    ORDER BY data_inicio;
  `;

  const result = await pool.query(query, [
    capelaId,
    data,
  ]);

  return result.rows;
};

/**
 * Buscar reserva por ID
 */
export const findById = async (id) => {
  const query = `
    SELECT *
    FROM reservas
    WHERE id = $1;
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

/**
 * Listar todas reservas (admin)
 */
export const findAllReservas = async () => {
  const query = `
    SELECT
      r.id,
      r.nome_falecido,
      r.nome_responsavel,
      r.telefone_responsavel,
      r.data_inicio,
      r.data_fim,
      r.slug_convite,
      c.nome AS capela,
      p.nome AS predio
    FROM reservas r
    JOIN capelas c ON c.id = r.capela_id
    JOIN predios p ON p.id = c.predio_id
    ORDER BY r.data_inicio DESC;
  `;

  const result = await pool.query(query);
  return result.rows;
};

/**
 * Atualizar reserva
 */
export const updateReserva = async (id, dados) => {
  const query = `
    UPDATE reservas
    SET
      nome_falecido = $1,
      nome_responsavel = $2,
      telefone_responsavel = $3,
      data_inicio = $4,
      data_fim = $5,
      capela_id = $6
    WHERE id = $7
    RETURNING *;
  `;

  const values = [
    dados.nome_falecido,
    dados.nome_responsavel,
    dados.telefone_responsavel,
    dados.data_inicio,
    dados.data_fim,
    dados.capela_id,
    id,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

/**
 * Deletar reserva por ID
 */
export const deleteReservaById = async (id) => {
  const query = `
    DELETE FROM reservas
    WHERE id = $1
    RETURNING *;
  `;

  const result = await pool.query(query, [id]);

  return result.rows[0];
};