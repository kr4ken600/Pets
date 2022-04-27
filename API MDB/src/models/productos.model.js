const mongoose = require('mongoose');

const productsSchema = mongoose.Schema({
  identificador:{
    type: String,
    unique: true
  },
  categoria:{
    type: String,
  },
  especie:{
    type: String,
  },
  imagen:{
    type: String,
  },
  nombre:{
    type: String,
  },
  precio:{
    type: String,
  },
  oferta:{
    type: String,
  },
  descuento:{
    type: String,
  },
  opciones:{
    type: String,
  }
},
{
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('productos', productsSchema);