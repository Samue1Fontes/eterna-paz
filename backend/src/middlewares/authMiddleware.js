import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "dev_secret";

export const requireAuth = (req, res, next) => {
  try {
    const auth = req.headers.authorization || "";
    const parts = auth.split(" ");

    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({ erro: "Token não informado" });
    }

    const decoded = jwt.verify(parts[1], SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido" });
  }
};
