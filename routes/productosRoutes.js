import express from "express";
import {checkAut} from "../middleware/checkAut.js";
import {
    obtenerProductos,
    nuevoProducto,
    editarProducto,
    eliminarProducto,
    
} from "../controllers/productosController.js";


const router = express.Router();


router
    .route("./")
    .post(checkAut, nuevoProducto) //Crear
    
router
    .route("/:id")
    .get(checkAut, obtenerProductos) //Listar
    .put(checkAut, editarProducto) //Actualizar
    .delete(checkAut, eliminarProducto) // Eliminar

export default router