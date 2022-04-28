const express = require('express');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const usersSchema = require('../models/users.model');
const middleware = require('../middleware/middlawere');

const router = express.Router();

router.post('/users', (req, res)=>{
  const users = usersSchema(req.body);
  users
    .save()
    .then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json({message:err})
    });
});

router.get('/users', (req, res)=>{
  usersSchema
    .find()
    .then((data)=>res.json(data))
    .catch((err)=>res.json({message:err}));
});

router.post('/users/login', (req, res)=>{
  
  const { email, password } = req.body;
  usersSchema.findOne({email})
    .then((data) => {
      const payload = {
        identificador: data.identificador,
        typeUser: data.typeUser,
        iat: moment().unix(),
        exp: moment().add(14, "days").unix()
      }
      if(data.password === password) res.json({token: jwt.sign(payload , process.env.TOKEN_SECRET)});
      else res.status(400).json({passError: "Contraseña incorrecta"});
    })
    .catch((error) => res.status(400).json({message: `Ocurrio un error inesperado: ${error}`}));
});

router.get('/users/personal', middleware.ensureAuthenticated, (req, res)=>{
  //const {identificador} = req.identificador;
  console.log(req.body);
  // usersSchema
  //   .findOne({identificador:id})
  //   .then((data)=>res.json(data))
  //   .catch((err)=>res.json({message:err}));
});



module.exports = router;