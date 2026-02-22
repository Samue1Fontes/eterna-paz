import express from "express";
import * as reservaController from "../controllers/reservaController.js";

const router = express.Router();

/**
 * POST /reservas
 */
router.post("/", reservaController.criar);

/**
 * GET /reservas
 */
router.get("/", reservaController.listar);

/**
 * GET /reservas
 */
router.get("/convite/:slug", reservaController.buscarConvite);

/**
 * PUT /reservas/:id
 */
router.put("/:id", reservaController.atualizar);

/**
 * DELETE /reservas/:id
 */
router.delete("/:id", reservaController.remover);

export default router;