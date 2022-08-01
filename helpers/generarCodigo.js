const generarCodigo = () => {

    const random = Math.random().toString(32).substring(9)
    const fecha = Date.now().toString(32).substring(6)
    const codigo = random + fecha
    return codigo


}
export default generarCodigo

