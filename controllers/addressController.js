const Shelter = require('../models/shelter');
const Address = require('../models/address')


const add = async (req, res) => {
    const { region, city, street, house } = req.body;
    if (!region || !city || !street || !house) {
        return res.status(404).json({ error : 'missing required fields'});
    }
    const owner = req.user.id;
    const shelter = await Shelter.findOne({ owner });
    if(!shelter) return res.status(403).json({ message : 'forbidden' });
}

module.exports = {
    add,
}