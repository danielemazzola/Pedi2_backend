import mongoose from "mongoose";


const MesaComensalesSchema = mongoose.Schema(
    {
      id:{
        type:String,
        trim:true
      },
      nombre:{
        type:String,
        trim:true
      },
      email:{
          type:String,
          trim:true
      },
      telefono:{
          type:String,
          trim:true
      },
      mesa:{
          type:Number,
          trim:true
      },
      restauranteId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Usuario",
      },
      mesaId: {
        type: Object,
        trim:true,
        require: true,
      },
      fecha:  {
        type:Date,
        default: Date.now(),
      },
    },
    {
      timestamps: true,
    }
  );



const MesaComensales = mongoose.model("MesaComensales", MesaComensalesSchema);
export default MesaComensales;