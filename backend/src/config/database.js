import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Configuração para Neon usando connection string + SSL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // string completa do Neon
  ssl: {
    rejectUnauthorized: false, // necessário para Render + Neon
  },
});

pool.on("connect", () => {
  console.log("✅ Conectado ao PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Erro no PostgreSQL:", err);
});

export default pool;