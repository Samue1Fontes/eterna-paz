import express from "express";
import * as reservaController from "../controllers/reservaController.js";
import { requireAuth } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * POST /reservas
 */
router.post("/", requireAuth, reservaController.criar);

/**
 * GET /reservas/:id
 */
router.get("/:id", requireAuth, reservaController.buscarPorId);

/**
 * GET /reservas
 */
router.get("/", requireAuth, reservaController.listar);

/**
 * GET /reservas
 */
// convite público
router.get("/convite/:slug", reservaController.buscarConvite);

/**
 * PUT /reservas/:id
 */
router.put("/:id", requireAuth, reservaController.atualizar);

/**
 * DELETE /reservas/:id
 */
router.delete("/:id", requireAuth, reservaController.remover);

export default router;