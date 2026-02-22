import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pool from "./config/database.js";
import predioRoutes from "./routes/predioRoutes.js";
import capelaRoutes from "./routes/capelaRoutes.js";
import reservaRoutes from "./routes/reservaRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/predios", predioRoutes);
app.use("/capelas", capelaRoutes);
app.use("/reservas", reservaRoutes);

app.get("/", async (req, res) => {
  const result = await pool.query("SELECT NOW()");
  res.json({
    message: "API Eterna Paz funcionando 🕊️",
    database_time: result.rows[0],
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
