import Mesas from "../model/Mesas.js";
import MesaComensales from "../model/MesaComensales.js";

const crearSalaComensales = async (req, res) => {
  const usuario = req.body.perfil;
  const consulta = await MesaComensales.find()
    .where("email")
    .equals(usuario.email);
  const idMesaComensal = await MesaComensales.findById(consulta)
  
  const idMesas = usuario.idMesa;
  const restaurante = req.body.paramRest;
  const existe = await Mesas.findById(idMesas);

  if (existe) {
    const cambiandoEstadoMesa = await Mesas.findById(existe);
    cambiandoEstadoMesa.estado = true;
    cambiandoEstadoMesa.nMesas = cambiandoEstadoMesa.nMesas + 1;
    cambiandoEstadoMesa.save();
    if (consulta.length > 0) {
      idMesaComensal.estado = true; 
      const idMesa = usuario.idMesa[0]._id
      
      idMesaComensal.mesa = usuario.mesa;
      idMesaComensal.mesaId = idMesa;
      idMesaComensal.restauranteId = usuario.restauranteSelect;
      const insertandoUsuario = await idMesaComensal.save();
      res.json({ insertandoUsuario });
    } else {
      const mesaOcupada = new MesaComensales();
      mesaOcupada.id = usuario.id;
      mesaOcupada.nombre = usuario.nombre;
      mesaOcupada.telefono = usuario.tel;
      mesaOcupada.email = usuario.email;
      mesaOcupada.mesa = usuario.mesa;
      mesaOcupada.restauranteId = restaurante.id;
      mesaOcupada.mesaId = existe._id;
      mesaOcupada.estado = true;
      const insertandoUsuario = await mesaOcupada.save();
      res.json({ insertandoUsuario });
    }
  } else {
    const error = new Error("Mesa no existe. Error 404");
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
  const usuario = await MesaComensales.findById(req.params.id);
 
  const mesaComensal = await Mesas.findById(usuario.mesaId);
  
  mesaComensal.nMesas = mesaComensal.nMesas - 1;
  mesaComensal.estado = false;
  usuario.estado = false;
  usuario.restauranteId = null;
  usuario.mesaId = null;
  usuario.mesa = null;
  //await usuario.delete();
  await mesaComensal.save();
  await usuario.save();
  res.json({ msg: "Comensal eliminado" });
};

export { crearSalaComensales, mostrarComensales, eliminarComensal };
