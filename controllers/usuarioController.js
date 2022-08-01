import Usuario from "../model/Usuario.js";
import generarId from "../helpers/generarId.js";
import generarJWT from "../helpers/generarJWT.js";
import {emailRegistro, emailOlvidoPassword} from "../helpers/email.js"

const registrar = async (req, res) => {
  //Evitar registros duplicados
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId();
    const usuarioAlmacenado = await usuario.save();
    res.json({ msg: "Estamos creando su cuenta, revise su email..." });
    
    //enviando email para validacion de cuenta con token
    emailRegistro({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token
    })

  } catch (error) {
    error = new Error('Algo a fallado, prueba en unos minutos...')
    res.json({msg: error.message})

  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;
  //comprobar si el usuario existe
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // comprobar que el usuario este confirmado
  if (!usuario.confirmado) {
    const error = new Error("Cuenta no confirmada");
    return res.status(403).json({ msg: error.message });
  }
  //comprobar su password
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("El password es incorrecto");
    return res.status(403).json({ msg: error.message });
  }
};
//confirmar token
const confirmar = async (req, res) => {
  const { token } = req.params;
  //verificar si el usuario existe
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("No existe el token o ya se confirmo la cuenta");
    return res.status(403).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = "";
    await usuarioConfirmar.save();
    res.json({ msg: "Usuario confirmado correctamente" });
  } catch (error) {
    
  }
};
const olvidePassword = async (req, res) => {
  const { email } = req.body;
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarId();
    usuario.confirmado = false;
    await usuario.save();

    //enviando email
    emailOlvidoPassword({
      nombre: usuario.nombre,
      email: usuario.email,
      token: usuario.token
    })


    res.json({ msg: "Te hemos enviado un email con las instrucciones, sigue los pasos" });
  } catch (error) {
  }
};

const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const tokenValido = await Usuario.findOne({ token });
  if (!tokenValido) {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
  try {
    tokenValido.confirmado = true;
    tokenValido.token="";
    await tokenValido.save();
    res.json({ msg: "Cuenta confirmada correctamente" });
  } catch (error) {
  }
};

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  const usuarioPassword = await Usuario.findOne({ token });

  if (usuarioPassword) {
    usuarioPassword.password = password;
    usuarioPassword.token = "";
    try {
      await usuarioPassword.save();
      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(404).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  try {
    const { usuario } = req;
    res.json(usuario);  
  } catch (error) {
    
  }
  
};

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
  perfil,
};
