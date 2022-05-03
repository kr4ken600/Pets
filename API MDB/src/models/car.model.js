const mongoose = require('mongoose');

const carsSchema = mongoose.Schema({
    identificador:{
        type: String,
        unique: true
    },
    id_cliente: {
        type: String,
    },
    id_producto:{
        type: String,
    },
    cantidad: {
        type: String,
    },
    precio: {
        type: String,
    }
},
{
  versionKey: false,
  timestamps: true
})

module.exports = mongoose.model('carritos', carsSchema);