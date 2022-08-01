import express from "express";
import {
  crearSalaComensales,
  mostrarComensales,
  eliminarComensal,
} from "../controllers/agregandoClientesMesas.js";

const router = express.Router();

//coleccion de mesas
router.get("/:id", mostrarComensales)
router.post("/agregarComensales", crearSalaComensales);
router.delete("/eliminarComensal/:id", eliminarComensal)

export default router;
