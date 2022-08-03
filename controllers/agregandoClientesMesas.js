import Mesas from "../model/Mesas.js";
import MesaComensales from "../model/MesaComensales.js";

const crearSalaComensales = async (req, res) => {
  const usuario = req.body.perfil;
  const idMesas = usuario.idMesa;
  const restaurante = req.body.paramRest;
  const existe = await Mesas.findById(idMesas);

  if (existe) {
    const cambiandoEstadoMesa = await Mesas.findById(existe);
    cambiandoEstadoMesa.estado = true;
    cambiandoEstadoMesa.nMesas = cambiandoEstadoMesa.nMesas + 1;
    cambiandoEstadoMesa.save();

    const mesaOcupada = new MesaComensales();
    mesaOcupada.id = usuario.id;
    mesaOcupada.nombre = usuario.nombre;
    mesaOcupada.telefono = usuario.tel;
    mesaOcupada.email = usuario.email;
    mesaOcupada.mesa = usuario.mesa;
    mesaOcupada.restauranteId = restaurante.id;
    mesaOcupada.mesaId = existe._id;

    const insertandoUsuario = await mesaOcupada.save();

    res.json({ insertandoUsuario });
  } else {
    const error = new Error("Mesa no existe. Eror 404");
    return res.json({ msg: error.message });
  }
};

const mostrarComensales = async (req, res) => {
  const rest = await MesaComensales.find()
    .where("restauranteId")
    .equals(req.params.id);
  res.json({ rest });
};

const eliminarComensal = async (req, res) => {
  const { id } = req.params;
  const usuario = await MesaComensales.find().where("id").equals(id);
  const comensal = await MesaComensales.findById(usuario);
  const mesaComensal = await Mesas.find().where("nMesa").equals(comensal.mesa);
  const modificandoMesa = await Mesas.findById(mesaComensal);

  try {
    await comensal.delete();
    modificandoMesa.nMesas = modificandoMesa.nMesas - 1;
    if(modificandoMesa.nMesas < 1) {
      modificandoMesa.nMes === 0;
      modificandoMesa.estado = false;
      await modificandoMesa.save();
    }else {
      await modificandoMesa.save();
    }

    res.json({ msg: "Comensal eliminado" });
  } catch (e) {}
};

export { crearSalaComensales, mostrarComensales, eliminarComensal };
