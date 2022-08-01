import mongoose from "mongoose";

const categoriaSchema = mongoose.Schema(
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
    nombreRestaurante: {
      type: mongoose.Schema.Types.String,
      ref: "Usuario",
    },
    restauranteId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
    },
  },
  {
    timestamps: true,
  }
);

const Categoria = mongoose.model("Categoria", categoriaSchema);
export default Categoria;
