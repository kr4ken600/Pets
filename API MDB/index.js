const express = require("express");
const mongoose = require('mongoose');
const cors = require('cors');

const {config} = require("./src/config");
const userRoute = require("./src/routes/users.route");
const productRoute = require("./src/routes/productos.route");
const addressRoute = require("./src/routes/address.route");
const carsRoute = require("./src/routes/cars.route");

const app = express();
const port = process.env.PORT || config.INIT_PORT;

//Conexion con MongoDB
mongoose.connect(
  `mongodb+srv://${config.MONGO_USERNAME}:${config.MONGO_PASSWORD}@pets0.hqxqs.mongodb.net/${config.MONGO_COLLECTION}?retryWrites=true&w=majority`,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
).then(()=>console.log("Conectado con MongoDB"))
.catch((error)=>console.error(error));

//Middleware
app.use(cors());
app.use(express.json());
app.use('/api', userRoute);
app.use('/api', productRoute);
app.use('/api', addressRoute);
app.use('/api', carsRoute);

//Rutas
app.get("/", (req,res) => {
  res.send("Bienvenido");
});

app.listen(port, ()=>console.log("Servidor iniciado en el puerto", port));