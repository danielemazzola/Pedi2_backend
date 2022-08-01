import Clientes from '../model/Clientes.js'
import Usuario from '../model/Usuario.js'
import {emailPedido} from '../helpers/email.js'

const nuevoPedido = async (req, res) => {
    const ordenNueva = req.body
    
    const pedidoCliente = new Clientes();
      
    pedidoCliente.usuarioCliente = ordenNueva.informacion;
      pedidoCliente.pedidos = ordenNueva.pedido;
      pedidoCliente.fecha = ordenNueva.fecha;
      pedidoCliente.total = ordenNueva.total;
      pedidoCliente.idRest = ordenNueva.rest._id
      pedidoCliente.metodoPago = ordenNueva.metodoPago

      if(ordenNueva.metodoPago == "3"){
        pedidoCliente.pagadoPre = true
      }

      if(ordenNueva.efectivo > 0){
        pedidoCliente.aPagar = ordenNueva.efectivo
      }
      const nuevoPedido = await Clientes.create(pedidoCliente)

      const restaurante = await Usuario.findById(ordenNueva.rest._id)


      emailPedido({
        nombre: ordenNueva.informacion.nombre,
        email: ordenNueva.informacion.email,
        pedido: ordenNueva.pedido,
        fecha: ordenNueva.fecha,
        total: ordenNueva.total,
        estado: ordenNueva.metodoPago,
        restaurante: restaurante.nombre,

      })
      res.json({ nuevoPedido });



  };

  export { nuevoPedido };