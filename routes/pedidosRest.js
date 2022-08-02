import express from "express";
import {checkAut} from'../middleware/checkAut.js'
import {
    mostrarVentas,
    entregado,
    resuelto,
    anulado,
    pedidoPagado,
    activar,
    borrar
} from "../controllers/misVentas.js";

const router = express.Router();

//coleccion de mesas
router.get("./", checkAut, mostrarVentas)
router.get("/ventas", checkAut, pedidoPagado)
router.get("/entregado/:id", checkAut, entregado)
router.get("/resuelto/:id", checkAut, resuelto)
router.get("/anulado/:id", checkAut, anulado)
router.get("/activar/:id", checkAut, activar)
router.get("/borrar/:id", checkAut, borrar)

export default router;