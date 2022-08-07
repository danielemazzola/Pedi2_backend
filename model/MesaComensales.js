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
        trim:true,
        default: null,

      },
      restauranteId: {
        type: String,
        default: null
      },
      mesaId: {
        type: String,
        default: null
      },
      fecha:  {
        type:Date,
        default: Date.now(),
      },
      estado: {
        type:Boolean,
        default: false
      }
    },
    {
      timestamps: true,
    }
  );



const MesaComensales = mongoose.model("MesaComensales", MesaComensalesSchema);
export default MesaComensales;