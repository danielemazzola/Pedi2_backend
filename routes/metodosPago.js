import express from "express";
import { 
    metodosPagoActualizado
 } from '../controllers/metodosPago.js'
import {checkAut} from "../middleware/checkAut.js";

const router = express.Router()

//Creacion, autenticacion, confirmacion de usuarios
router.put('/update/:id', checkAut, metodosPagoActualizado ) //crear nuevos metodos de pago

export default router;