import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "dev_secret";

export const login = async (req, res) => {
  const { login, senha } = req.body;

  // credenciais fixas
  if (login === "admin" && senha === "admin@123") {
    const token = jwt.sign({ user: "admin" }, SECRET, { expiresIn: "8h" });
    return res.json({ token });
  }

  return res.status(401).json({ erro: "Credenciais inválidas" });
};
