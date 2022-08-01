import Usuario from '../model/Usuario.js'

const metodosPagoActualizado = async (req, res) => {
    const {id} = req.params

    const nuevoCambio = req.body

    const modificandoPagos = await Usuario.findById(id)

    modificandoPagos.efectivo = nuevoCambio.efectivoUser || modificandoPagos.efectivo
    modificandoPagos.datafono = nuevoCambio.datafonoUser || modificandoPagos.datafono
    modificandoPagos.paypal = nuevoCambio.paypalUser || modificandoPagos.paypal
    
    const guardandoMetodosPago = await modificandoPagos.save()
    res.json({guardandoMetodosPago})

  };

  export { metodosPagoActualizado };