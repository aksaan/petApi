const bcrypt = require('bcrypt');

const Shelter = require('../models/shelter');
const User = require('../models/user');

const add = async (req, res) => {
    console.log(req.file)
    const { ogrn, title, email, phone, desription } = req.body;
    if (!ogrn || !title || !email) {
        return res.status(404).json({ error : 'missing required fields'});
    }
    const owner = req.user.id;
    const sameOwner = await Shelter.findOne({ owner });
    if (sameOwner){
        return res.status(409).json({ error : 'shelter with same owner already registered'});
    }

    const shelter= new Shelter({ owner, email, ogrn, title, phone, desription});
    await shelter.save();

    return res.status(201).json(shelter);
}

const avatar = async (req, res) => {
    if(!req.file) return res.status(401).json({ error : "no file" });
    const avatar = req.file;
    const id = req.params.id
    const shelter = await Shelter.findById(id);
    console.log(shelter.owner.valueOf(), req.user.id)
    if(shelter.owner.valueOf() !== req.user.id) return res.status(403).json({ message : 'forbidden' });
    const result = await Shelter.updateOne({id}, {avatar : avatar.path})
    if (result) return res.status(200).json({message : 'successfully changed'})
}

const one = async (req, res) => {
    const id = req.params.id;
    const shelter = await Shelter.findById(id);
        
    if(shelter) return res.status(200).json(shelter);

    return res.status(404).json({ error : 'shelter not found'});
}

const all = async (req, res) => {
    const shelters = await Shelter.find();
    res.status(200).json(shelters);
}

const remove = async (req, res) => {
    const id = req.params.id;
    const shelter = await Shelter.findById(id)
    if(!shelter) return res.status(404).json({ message : 'shelter not found' });
    
    if(shelter.owner.valueOf() !== req.user.id) return res.status(403).json({ message : 'forbidden' });

    await Shelter.deleteOne({ id });
    res.status(202).json(shelter);
}

module.exports = {
    add,
    all,
    one,
    remove,
    avatar
}
