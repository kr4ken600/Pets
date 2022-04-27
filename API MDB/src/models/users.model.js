const mongoose = require('mongoose');

const usersSchema = mongoose.Schema({
  identificador:{
    type: String,
    unique: true
  },
  typeUser:{
    type: String,
  },
  userName:{
    type: String,
  },
  password:{
    type: String,
  },
  email:{
    type: String,
  },
  mascota:{
    type: Array,
  }
},
{
  versionKey: false,
  timestamps: true
});

module.exports = mongoose.model('Users', usersSchema);