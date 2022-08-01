import mongoose from "mongoose";

const clientesSchema = mongoose.Schema(
  {
    usuarioCliente: {
      type: Object,
      trim: true,
      require: true,
    },
    idRest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
    pedidos: {
      type: Object,
      require: true,
    },
    fecha: {
      type: Date,
      default: Date.now(),
    },
    total: {
      type: Number,
    },
    estado: {
      type: Boolean,
      default: false,
    },
    anulado: {
      type: Boolean,
      default: false,
    },
    pagado:{
      type: Boolean,
      default:false,
    },
    pagadoPre:{
      type: Boolean,
      default:false,
    },
    mostrar:{
      type: Boolean,
      default:true,
    },
    metodoPago:{
      type: String,
      require: true,      
    },
    aPagar:{
      type: Number,
      default: 0
    },
    pagadoPaypal:{
      type:Boolean,
      default:false
    }
  },
  {
    timestamps: true,
  }
);

const Clientes = mongoose.model("Cliente", clientesSchema);
export default Clientes;
