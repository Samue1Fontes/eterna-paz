// backend/src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "../config/database.js"; // atenção ao caminho
import predioRoutes from "./routes/predioRoutes.js";
import capelaRoutes from "./routes/capelaRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/predios", predioRoutes);
app.use("/capelas", capelaRoutes);
app.use("/reservas", reservaRoutes);
app.use("/auth", authRoutes);

// Rota de teste
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "API Eterna Paz funcionando 🕊️",
      database_time: result.rows[0],
    });
  } catch (err) {
    console.error("Erro ao conectar no banco:", err.message);
    res.status(500).json({ error: "Erro ao conectar no banco" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});