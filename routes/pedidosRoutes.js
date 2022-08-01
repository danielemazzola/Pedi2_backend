import express from "express";
import { 
    nuevoPedido,
 } from '../controllers/pedidos.js'

const router = express.Router()

//nuevo pedido
router.post('/', nuevoPedido) //crear nuevo pedido


export default router;