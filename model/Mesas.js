import mongoose from "mongoose";


const MesaSchema = mongoose.Schema(
    {
      restaurante: {
        type: Object,
        require: true,
      },
      nMesa:{
        type: String,
        required:true,
      },
      codigoMesa: {
        type:String,
        trim:true
      },
      nMesas: {
        type:Number,
        default:0,
      },
      fecha:  {
        type:Date,
        default: Date.now(),
      },
      estado:{
        type: Boolean,
        default: false,
      },
      restId: {
        type: mongoose.Schema.Types.ObjectId,
        reference: "Usuario",
      }
      
    },
    {
      timestamps: true,
    }
  );



const Mesas = mongoose.model("Mesas", MesaSchema);
export default Mesas;