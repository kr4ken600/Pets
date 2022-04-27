const express = require('express');
const jwt = require('jsonwebtoken');
const usersSchema = require('../models/users.model');

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
  console.log(req.body);
  const { email, password } = req.body;
  usersSchema.findOne({email})
    .then((data) => {
      if(data.password === password) res.json({token: jwt.sign({
        identificador: data.identificador, 
        userName: data.userName,
        typeUser: data.typeUser
      }, process.env.TOKEN_SECRET, {expiresIn: '1h'})});
      else res.status(400).json({passError: "Contraseña incorrecta"});
    })
    .catch((error) => res.status(400).json({message: `Ocurrio un error inesperado: ${error}`}));
});

router.get('/users/:id', (req, res)=>{
  const {id} = req.params;
  usersSchema
    .findOne({identificador:id})
    .then((data)=>res.json(data))
    .catch((err)=>res.json({message:err}));
});

module.exports = router;