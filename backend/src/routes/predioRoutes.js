import express from "express";
import * as controller from "../controllers/predioController.js";

const router = express.Router();

router.get("/", controller.listar);
router.post("/", controller.criar);

export default router;