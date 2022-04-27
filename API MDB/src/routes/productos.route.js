const express = require('express');
const productsSchema = require('../models/productos.model');

const router = express.Router();

router.post('/products', (req, res)=>{
  const products = productsSchema(req.body);
  products
    .save()
    .then((data)=>{
      res.json(data)
    }).catch((err)=>{
      res.json({message:err})
    });
});

router.get('/products', (req, res)=>{
  productsSchema
    .find()
    .then((data)=>res.json(data))
    .catch((err)=>res.json({message:err}));
});

router.get('/products/:especie/:categoria', (req, res)=>{
  const {especie} = req.params;
  const {categoria} = req.params;
  productsSchema
    .find({especie:especie, categoria:categoria})
    .then((data)=>res.json(data))
    .catch((err)=>res.json({message:err}));
});

router.get('/products/:id', (req, res)=>{
    const {id} = req.params;
    productsSchema
      .findOne({identificador:id})
      .then((data)=>res.json(data))
      .catch((err)=>res.json({message:err}));
  });

module.exports = router;