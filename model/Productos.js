import mongoose from "mongoose";

const productoSchema = mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    descripcion: {
      type: String,
      required: true,
      trim: true,
    },
    fecha: {
      type: Date,
      default: Date.now(),
    },
    estado: {
      type: Boolean,
      default: false
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      reference: "Categoria"
    },
    precio:{
      type: Number,
      required: true,
    },
    gluten : {
      type: Boolean,
      default: false
    },
    crustaceos  : {
      type: Boolean,
      default: false
    },
    huevos : {
      type: Boolean,
      default: false
    },
    pescado : {
      type: Boolean,
      default: false
    },
    cacahuetes : {
      type: Boolean,
      default: false
    },
    leche : {
      type: Boolean,
      default: false
    },
    soja : {
      type: Boolean,
      default: false
    },
    frutosCascara : {
      type: Boolean,
      default: false
    },
    apio : {
      type: Boolean,
      default: false
    },
    mostaza : {
      type: Boolean,
      default: false
    },
    sesamo : {
      type: Boolean,
      default: false
    },
    dioxidoAzufreSulfitos : {
      type: Boolean,
      default: false
    },
    altramuces : {
      type: Boolean,
      default: false
    },
    moluscosCrustaceos : {
      type: Boolean,
      default: false
    },
    imagen: {
        type: String,
    }
  },

  {
    timestamps: true,
  }
);

const Producto = mongoose.model("Producto", productoSchema);
export default Producto;
