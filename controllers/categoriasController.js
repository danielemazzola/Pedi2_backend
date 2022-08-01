import Categoria from "../model/Categoria.js";
import Producto from "../model/Productos.js";

const obtenerCategorias = async (req, res) => {
  const categorias = await Categoria.find()
    .where('restauranteId')
    .equals(req.usuario);
  res.json({ categorias });
};

const nuevaCategoria = async (req, res) => {
  try {
    const categoria = new Categoria(req.body);
    categoria.nombreRestaurante = req.usuario.nombre;
    categoria.restauranteId = req.usuario._id;
    const insertandoCategoria = await categoria.save();
    res.json({ insertandoCategoria });
  } catch (error) {
    error = new Error("Algo a fallado, prueba en unos minutos...");
    return res.json({ msg: error.message });
  }
};

const obtenerCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);

  if(!categoria){
    const error = new Error("Categoria no encontrada");
    return res.status(404).json({msg: error})
  }
  if(categoria.restauranteId.toString() !== req.usuario._id.toString()){
    const error = new Error("No tienes los permisos para realizar los cambios");
    return res.status(404).json({msg: error})
  }
   
  res.json(categoria)


}

const editarCategoria = async (req, res) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id);
  const categoriaId = categoria.restauranteId;
  const usuarioId = req.usuario._id;
  if (categoriaId.toString() !== usuarioId.toString()) {
    const error = new Error("No es posible editar esta categoria");
    return res.json({ msg: error.message });
  }
  try {
    categoria.nombre = req.body.nombre || categoria.nombre;
    categoria.descripcion = req.body.descripcion || categoria.descripcion;
    const cambiosCategoria = await categoria.save();
    res.json({ cambiosCategoria });
  } catch (error) {
    error = new Error("Algo a salido mal, prueba a recargar la pagina");
    return res.json({ msg: error.message });
  }
};
const eliminarCategoria = async (req, res) => {
  const usuario = req.usuario;
  const { id } = req.params;
  const categoria = await Categoria.findById(id);
  const restauranteId = categoria.restauranteId;
  const usuarioId = usuario._id;

  if (restauranteId.toString() !== usuarioId.toString()) {
    const error = new Error("No es posible eliminar la categoria");
    return res.json({ msg: error.message });
  }

  try {
    await categoria.delete(id);
    res.json({ msg: "Categoria eliminada correctamente." });
  } catch (error) {
  }
};

const mostrandoProductos = async (req, res) => {

  const { id } = req.params;
  const usuario = req.usuario
  const categoriaId = await Categoria.findById(id);
  const productoCategoria = categoriaId.restauranteId
  const productos = await Producto.find().where("categoria").equals(id)
  
  if (!productos) {
    const error = new Error("El producto no existe");
    return res.json({ msg: error.message });
  }

  if (productoCategoria.toString() !== usuario._id.toString()) {
    const error = new Error("No tienes permisos");
    return res.json({ msg: error.message });
  }

  try {
    res.json({productos})
  } catch (error) {
  }
  


}

export {
  obtenerCategorias,
  nuevaCategoria,
  editarCategoria,
  eliminarCategoria,
  mostrandoProductos,
  obtenerCategoria
};
