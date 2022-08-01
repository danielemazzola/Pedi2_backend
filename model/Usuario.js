import mongoose from "mongoose";
import bcrypt from "bcrypt";

const usuarioSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    codigo: {
      type: String,
    },
    
    fecha: {
      type: Date,
      default: Date.now(),
    },
    telefono: {
      type:String,
      trim:true
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    token: {
      type: String,
    },
    confirmado: {
      type: Boolean,
      default: false,
    },
    nif:{
      type: String,
      required:true
    },
    efectivo:{
      type: Boolean,
      default: false
    },
    datafono:{
      type: Boolean,
      default: false
    },
    paypal:{
      type: String,
      default: "0"
    }
  },
  {
    timestamps: true,
  }
);

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

usuarioSchema.methods.comprobarPassword = async function(passwordFormulario) {
  return await bcrypt.compare(passwordFormulario, this.password)
}

const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
