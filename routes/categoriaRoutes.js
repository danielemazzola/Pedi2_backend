import express from "express";
import {checkAut} from "../middleware/checkAut.js";
import {
    obtenerCategorias,
    nuevaCategoria,
    editarCategoria,
    eliminarCategoria,
    mostrandoProductos,
    obtenerCategoria
} from "../controllers/categoriasController.js";

const router = express.Router();


router
    .route("./")
    .get(checkAut, obtenerCategorias) //Listar
    .post(checkAut, nuevaCategoria) //Crear
router
    .route("/:id")
    .get(checkAut, obtenerCategoria) //ver categoria
    .put(checkAut, editarCategoria) //Actualizar
    .delete(checkAut, eliminarCategoria) // Eliminar
router.get("/productos/:id", checkAut, mostrandoProductos )

export default router