import Clientes from '../model/Clientes.js'

const mostrarVentas = async (req, res) => {
    const usuario = req.usuario
    const pedidos = await Clientes.find().where("idRest").equals(usuario._id)   
    const pendiente = pedidos.filter((pedido) => (pedido.estado === false && pedido.anulado === false && pedido.pagado === false))
    const entregado = pedidos.filter((pedido) => (pedido.estado === true && pedido.anulado === false && pedido.pagado === false))
    const anulado = pedidos.filter((pedido) => (
      pedido.anulado === true && pedido.mostrar === true))
    res.json({pendiente, entregado, anulado})
  };

  const entregado = async (req, res) => {
    const id = req.params.id

    try {
      const orden = await Clientes.findById(id)
      orden.estado = true
      await orden.save()
      res.json({msg: "Orden modificada correctamente"})
    } catch (error) {
      console.log(error)
    }
  }

  const resuelto = async (req, res) => {
    const id = req.params.id

    try {
      const orden = await Clientes.findById(id)
      orden.pagado = true
      orden.pagadoPre = true
      await orden.save()
      res.json({orden})
    } catch (error) {
      console.log(error)
    }
  }

  const anulado = async (req, res) => {
    const id = req.params.id

    try {
      const orden = await Clientes.findById(id)
      orden.anulado = true
      await orden.save()
      res.json({msg: "Orden anulada correctamente"})
    } catch (error) {
      console.log(error)
    }
  }

  
  const activar = async(req, res) => {
    const id = req.params.id
    
    try {
      const orden = await Clientes.findById(id)
      orden.estado = false
      orden.anulado = false
      await orden.save()
      res.json({msg: "Orden activada correctamente"})
    } catch (error) {
      console.log(error)
    }
  }

  const borrar = async (req, res) => {
    const id = req.params.id
    try {
      const orden = await Clientes.findById(id)
      orden.mostrar = false
      await orden.save()
      res.json({msg: "Orden eliminada correctamente"})
    } catch (error) {
      console.log(error)
    }

  }
  
  const pedidoPagado = async(req, res) => {
    const usuario = req.usuario
    const ventas = await Clientes.find().where("idRest").equals(usuario._id)
    const venta = ventas.filter((ventaOk) => ventaOk.pagado === true)

    res.json({venta})
  }

  export { 
    mostrarVentas,
    pedidoPagado,
    entregado,
    anulado,
    resuelto,
    activar,
    borrar
  };