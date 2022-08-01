import express from "express";
import { 
    registrar, 
    autenticar,
    confirmar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    perfil
 } from '../controllers/usuarioController.js'
import {checkAut} from "../middleware/checkAut.js";

const router = express.Router()

//Creacion, autenticacion, confirmacion de usuarios
router.post('/', registrar) //crear nuevo usuario
router.post('/login', autenticar)
router.get('/confirmar/:token', confirmar)
router.post('/olvide-password', olvidePassword)
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)

router.get('/perfil', checkAut, perfil)

export default router;