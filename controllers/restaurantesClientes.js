import Usuario from "../model/Usuario.js";
import Categoria from "../model/Categoria.js";
import Producto from "../model/Productos.js";
import Mesas from '../model/Mesas.js'

const restaurantes = async (req, res) => {
  const buscarRestaurantes = await Usuario.find();

  if (!buscarRestaurantes) {
    const error = new Error("No existen restaurantes");
    return res.status(404).json({ msg: error.message });
  }

  try {
    res.json({ buscarRestaurantes });
  } catch (error) {
    console.log(error.message);
  }
};

const Categoriasrestaurante = async (req, res) => {
  //captando el ID por res
  const { id } = req.params;
  //Verificando restaurante
  const restaurante = await Usuario.findById(id);
  //Categorias
  const categorias = await Categoria.find().where("restauranteId").equals(id);
  //mesas
  const mesas = await Mesas.find().where("restId").equals(id)
  
  //Validando que exista el restaurante
  if (!restaurante) {
    const error = new Error("Restaurante no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  if (!restaurante.confirmado) {
    const error = new Error("Restaurante no activo");
    return res.status(404).json({ msg: error.message });
  }

  try {
    res.json({ restaurante, categorias, mesas });
  } catch (error) {
    console.log(error);
  }
};

const productos = async (req, res) => {

  //captando el ID por res
  const { id } = req.params;
  

  //Mostrando productos
  const productos = await Producto.find().where("categoria").equals(id);

  //buscando Categoria
  const categoria = await Categoria.findById(id)

  //buscando restaurante
  const { restauranteId } = categoria
  const restaurante = await Usuario.findById(restauranteId)
  
    if (!productos) {
    const error = new Error("Producto no encontrado");
    return res.status(404).json({ msg: error.message });
  }
  

  try {
    res.json({ restaurante, categoria, productos });
  } catch (error) {
    console.log(error);
  }

} 

const registrar = () => {};
const autenticar = () => {};
const olvidePassword = () => {};

export { restaurantes, Categoriasrestaurante, productos, registrar, autenticar, olvidePassword };
