const express = require('express');
const mongoose = require('mongoose');
const { Customer, validate } = require('../models/customer');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');

    res.send(customers);
});

router.get('/:id', async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).send('customer with the given ID was not found');

    res.send(customer);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const customer = await new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });

    await customer.save();

    res.send(customer);
});

router.put(':/id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        name: name.req.body,
        phone: req.body.phone,
        isGold: req.body.isGold
    }, { new: true });

    if (!customer) return res.status(404).send('customer with the given ID was not found');

    res.send(customer);
});

router.delete(':id', async (req, res) => {
    const customer = Customer.findByIdAndRemove(req.params.id);
    if (!coustomer) return res.status(404).send('customer with the given ID was not found');
});
// router.delete('/', async (req,res) =>{
//     const customer = await Customer.deleteMany();
//     res.status(200).send(); 
// });

module.exports = router;