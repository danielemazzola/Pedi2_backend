import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import productosRoutes from "./routes/productosRoutes.js";
import mesasRotes from './routes/mesasRotes.js'
import clientesRoutes from "./routes/clientesRoutes.js";
import pedidosRoutes from "./routes/pedidosRoutes.js";
import roomMesas from "./routes/roomMesas.js";
import pedidosRest from './routes/pedidosRest.js'
import metodosPago from './routes/metodosPago.js'

const app = express();
app.use(express.json());


dotenv.config();

conectarDB();

/***** */
//conf CORS
const whiteList = [process.env.URL_FRONT];
const corsOption = {
  origin: function (origin, callback) {
    if (whiteList.includes(origin)) {
      //puede consultar API
      callback(null, true);
    } else {
      //no puede consultar API
      callback(new Error("Error de Cors"));
    }
  },
};
app.use(cors(corsOption));

//ROUTING
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/mesas", mesasRotes);
app.use("/api/restaurantes", clientesRoutes);
app.use("/api/pedido", pedidosRoutes);
app.use("/api/comensales", roomMesas);
app.use("/api/pedidos", pedidosRest)
app.use("/api/metodosPago", metodosPago)

const PORT = process.env.PORT || 4000;
/****** */

const servidor = app.listen(PORT, () => {
  console.log(`servidor correindo en puerto: ${PORT}`);
});

//socket.IO
import { Server } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 6000,
  cors: {
    origin: process.env.URL_FRONT,
  },
});

io.on("connection", (socket) => {
  //console.log("Conectado al socket.io");

  //Definir los eventos de Socket
  socket.on("restaurante",(params) => {
    socket.join(params)

  })
  socket.on("categorias",(data) => {
    socket.join(data)
    //console.log("nuevo room")
  })

  socket.on("nuevoProducto", ( data ) => {
    const id = data.nuevoProducto.categoria
    socket.to(id).emit("productosActualizados", data)
    socket.to(id).emit("productos", data)
    
  })

  socket.on("productoActualizado", ( data ) => {
    const id = data.cambiosProducto.categoria
    socket.to(id).emit("productoAct", data)
    
  })

  /*socket.on("productoEliminado", ( data ) => {
    const id = data._id
    socket.to(id).emit("productoActEliminado", data)
    //socket.to(id).emit("productos", data)

    //const productosActualizados = productos.filter( productosState => productosState._id !== id)
    //setProductos(productosActualizados)
    
  })*/

  //identificando los usuario por mesas
  

  



  
});
