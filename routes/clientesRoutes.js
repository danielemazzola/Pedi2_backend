import express from "express";
import { 
    restaurantes,
    Categoriasrestaurante,
    productos,
    registrar,
    autenticar,
    olvidePassword    
 } from '../controllers/restaurantesClientes.js'


const router = express.Router()

//Creacion, autenticacion, confirmacion de usuarios
router.get('/', restaurantes)
router.get('/:id', Categoriasrestaurante)
router.get('/:id/:id', productos)
router.post('/registro-cliente', registrar) //crear nuevo usuario
router.post('/login-cliente', autenticar)
router.post('/olvide-password', olvidePassword)
//router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

export default router;