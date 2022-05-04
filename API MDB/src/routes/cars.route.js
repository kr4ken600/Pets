const express = require('express');
const carsSchema = require('../models/car.model');

const router = express.Router();

router.post('/car', (req, res) => {
    const car = carsSchema(req.body);
    car
        .save()
        .then((data) => {
            res.json(data);
        }).catch((error) => {
            res.status(500).json({message: error});
        });
});

router.get('/car/:id', (req, res) => {
    const {id} = req.params;
    carsSchema
        .find({id_cliente: id})
        .then((data) => res.json(data))
        .catch((error) => res.status(500).json({message: error}));
})

router.delete('/car/:id', (req, res) => {
    const {id} = req.params;
    carsSchema
        .deleteOne({identificador: id})
        .then(data => res.json(data))
        .catch((error) => res.status(500).json({message: error}));
})

module.exports = router;