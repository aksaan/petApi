const bcrypt = require('bcrypt');

const Shelter = require('../models/shelter');
const User = require('../models/user');
const Pet = require('../models/pet')

const add = async (req, res) => {
    const { name, info, images } = req.body;
    if (!name || !info) {
        return res.status(404).json({ error : 'missing required fields'});
    }
    return res.status(201).json({ message : 'pet successfully created' });
}

const all = async (req, res) => {
    const pets = await Pet.find();
    res.status(200).json(pets);
}

module.exports = {
    add,
    all
}