import express from "express";
import * as capelaController from "../controllers/capelaController.js";

const router = express.Router();

router.get("/", capelaController.listar);
router.post("/", capelaController.criar);
router.get("/predio/:predio_id", capelaController.listarPorPredio);
router.get("/:id/disponibilidade", capelaController.disponibilidade);

export default router;