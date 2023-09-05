const bcrypt = require('bcrypt');

const Shelter = require('../models/shelter');
const User = require('../models/user');

const add = async (req, res) => {
    const { ogrn, title, email, phone } = req.body;
    if (!ogrn || !title || !email) {
        return res.status(404).json({ error : 'missing required fields'});
    }
    const owner = req.user.id;
    const sameOwner = await Shelter.findOne({ owner });
    if (sameOwner){
        return res.status(409).json({ error : 'shelter with same owner already registered'});
    }

    const newOwner= new Shelter({ owner, email, ogrn, title, phone});
    await newOwner.save();

    return res.status(201).json({ message : 'shelter successfully created' });
}

const shelter = async (req, res) => {
    const id = req.params.id;
    const shelter = await Shelter.findById(id);
        
    if(shelter) return res.status(200).json(shelter);

    return res.status(404).json({ error : 'shelter not found'});
}

const all = async (req, res) => {
    const shelters = await Shelter.find();
    res.status(200).json(shelters);
}

module.exports = {
    add,
    all,
    shelter
}
