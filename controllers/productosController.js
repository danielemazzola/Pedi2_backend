import Categoria from "../model/Categoria.js";
import Producto from "../model/Productos.js";





const nuevoProducto = async (req, res) => {
  const { categoria } = req.body;
  const existe = await Categoria.findById(categoria);
  
  if (!existe) {
    const error = new Error("La categoria no existe");
    return res.status(404).json({ msg: error.message });
  }
  
  if (existe.restauranteId.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para agregar productos");
    return res.status(404).json({ msg: error.message });
  }
  
  
  try {
    
    const nuevoProducto = await Producto.create(req.body);
    res.json({ nuevoProducto });
  } catch (error) {
  }
};

const obtenerProductos = async (req, res) => {
  //buscando el producto
  const { id } = req.params; // retorna ID del producto
  
  const producto = await Producto.findById(id);

  //buscando la categoria
  const { categoria } = producto;
  const existeCategoria = await Categoria.findById(categoria);

  if (!producto) {
    const error = new Error("Producto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (existeCategoria.restauranteId.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para ver este producto");
    return res.status(404).json({ msg: error.message });
  }

  try {
    res.json({producto});
  } catch (error) {
  }
};

const editarProducto = async (req, res) => {
  //buscando el producto
  const { id } = req.params; // retorna ID del producto
  const producto = await Producto.findById(id);

  //buscando la categoria
  const { categoria } = producto;
  const existeCategoria = await Categoria.findById(categoria);

  if (!producto) {
    const error = new Error("Producto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (existeCategoria.restauranteId.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para ver este producto");
    return res.status(404).json({ msg: error.message });
  }

  try {
    producto.nombre = req.body.nombre || producto.nombre;
    producto.descripcion = req.body.descripcion || producto.descripcion;
    producto.precio = req.body.precio || producto.precio;
    producto.estado = req.body.estado || producto.estado;
    producto.categoria = req.body.categoria || producto.categoria;
    /*producto.imagen = req.file.imagen || producto.imagen;*/

    producto.gluten = req.body.gluten || producto.gluten;
    producto.crustaceos = req.body.crustaceos || producto.crustaceos;
    producto.huevos = req.body.huevos || producto.huevos;
    producto.pescado = req.body.pescado || producto.pescado;
    producto.cacahuetes = req.body.cacahuetes || producto.cacahuetes;
    producto.leche = req.body.leche || producto.leche;
    producto.soja = req.body.soja || producto.soja;
    producto.frutosCascara = req.body.frutosCascara || producto.frutosCascara;
    producto.apio = req.body.apio || producto.apio;
    producto.mostaza = req.body.mostaza || producto.mostaza;
    producto.sesamo = req.body.sesamo || producto.sesamo;
    producto.dioxidoAzufreSulfitos = req.body.dioxidoAzufreSulfitos || producto.dioxidoAzufreSulfitos;
    producto.altramuces = req.body.altramuces || producto.altramuces;
    producto.moluscosCrustaceos = req.body.moluscosCrustaceos || producto.moluscosCrustaceos;

    const cambiosProducto = await producto.save();
    res.json({ cambiosProducto });
  } catch (error) {
  }
};


const eliminarProducto = async (req, res) => {
  //buscando el producto
  const { id } = req.params; // retorna ID del producto
  const producto = await Producto.findById(id);

  //buscando la categoria
  const { categoria } = producto;
  const existeCategoria = await Categoria.findById(categoria);

  if (!producto) {
    const error = new Error("Producto no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  if (existeCategoria.restauranteId.toString() !== req.usuario._id.toString()) {
    const error = new Error("No tienes permisos para ver este producto");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const eliminadoProducto = await producto.delete();
    res.json({ msg: "Producto eliminado de forma correcta" });
  } catch (error) {
  }
};

export { nuevoProducto, obtenerProductos, editarProducto, eliminarProducto };
