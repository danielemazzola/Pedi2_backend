import express from "express";
import {checkAut} from "../middleware/checkAut.js";
import { 
    obtenerMesas,
    crearMesa, 
    estadoReset,
 } from '../controllers/mesasRestaurantes.js'


 const router = express.Router()

//coleccion de mesas
router.get('/', checkAut, obtenerMesas)
router.post('/crear-mesa', checkAut, crearMesa)
router.put('/modificarestado/:id', checkAut, estadoReset)



export default router;