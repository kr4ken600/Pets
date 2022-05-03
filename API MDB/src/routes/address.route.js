const express = require('express');
const addressSchema = require('../models/direcciones.model');

const router = express.Router();

router.post('/address',  (req, res) => {
    const address = addressSchema(req.body);
    address
        .save()
        .then((data) => {
            res.json(data);
        }).catch((error) => {
            res.status(500).json({message: error});
        });
});

router.get('/address/:id', (req, res) => {
    const {id} = req.params;
    addressSchema
        .find({id_cliente: id})
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({message: error}));
})

router.delete('/address/:id', (req, res) => {
    const {id} = req.params;
    addressSchema
        .deleteOne({identificador: id})
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({message: error}));
})

module.exports = router;