const mongoose = require('mongoose');

const addressSchema = mongoose.Schema({
    identificador:{
        type: String,
        unique: true
    },
    id_cliente:{
        type: String,
    },
    codigoPostal:{
        type: String,
    },
    calle:{
        type: String,
    },
    numeroExterior:{
        type: String,
    },
    colonia:{
        type: String,
    },
    ciudad:{
        type: String,
    },
    telefono:{
        type: String,
    }
},
{
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('direcciones', addressSchema);