import Mesas from "../model/Mesas.js";
import Usuario from "../model/Usuario.js";
import MesaComensales from "../model/MesaComensales.js";

const obtenerMesas = async (req, res) => {
  const restaurante = await Usuario.findById(req.usuario);
  const { _id } = restaurante;

  const mesas = await Mesas.find().where("restId").equals(_id);
  
  res.json({ mesas });
};

const crearMesa = async (req, res) => {
  const { mesa, idRest, valorMesa, perfil } = req.body;
  const recibiendoMesa = new Mesas();

  recibiendoMesa.codigoMesa = mesa;
  recibiendoMesa.restId = idRest;
  recibiendoMesa.nMesa = valorMesa;
  recibiendoMesa.restaurante = perfil;

  const insertandoMesa = await Mesas.create(recibiendoMesa);
  res.json({ insertandoMesa });
};

const estadoReset = async (req, res) => {
  const mesa = await Mesas.findById(req.params.id)
  const comensales = await MesaComensales.find().where("mesaId").equals(mesa)
  const ids = comensales.map((comensales) => comensales._id)
  const mesas = await MesaComensales.find()
  const mesasALimpiar = mesas.map(mesas => mesas.mesaId = ids && mesas.delete())
  mesa.estado = false;
  mesa.nMesas = 0
  await mesa.save()
  res.json({mesa})
  
}




export { obtenerMesas, crearMesa, estadoReset };
