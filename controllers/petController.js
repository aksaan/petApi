const bcrypt = require('bcrypt');

const Shelter = require('../models/shelter');
const Pet = require('../models/pet')

const add = async (req, res) => {
    const { name, info, images } = req.body;
    if (!name || !info) {
        return res.status(404).json({ error : 'missing required fields'});
    }
    const owner = req.user.id;
    const shelter = await Shelter.findOne({ owner });
    if(!shelter) return res.status(403).json({ message : 'forbidden' });

    const pet= new Pet({ name, info, images, shelter });
    await pet.save();

    return res.status(201).json(pet);
}

const all = async (req, res) => {
    const pets = await Pet.find();
    res.status(200).json(pets);
}

module.exports = {
    add,
    all
}