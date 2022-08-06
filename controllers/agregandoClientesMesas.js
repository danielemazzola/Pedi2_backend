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
  if(usuario){
    const mesaComensal = await Mesas.findById(usuario.mesaId)
  
    await usuario.delete();
    mesaComensal.nMesas = mesaComensal.nMesas - 1;
    if(mesaComensal.nMesas < 1) {
      mesaComensal.nMesas = 0;
      mesaComensal.estado = false;
      await mesaComensal.save();
    }else {
      await mesaComensal.save();
      res.json({ msg: "Comensal eliminado" });
    }
  }else{
    
    res.json({ msg: "Comensal eliminado" });
  }
  

  
};

export { crearSalaComensales, mostrarComensales, eliminarComensal };
