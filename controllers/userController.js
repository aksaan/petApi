const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/user');

const signup = async (req, res) => {
    if(!req.body) return res.status(400).json({ error : 'No data' });

    const { email, password, firstname, secondname } = req.body;

    const sameLogin = await User.findOne({ email });
    if(sameLogin){
        return res.status(409).json({ error : 'user with same email already registered'});
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ email, password : hashed, firstname, secondname });
    await user.save();

    return res.status(201).json({ message : 'user successfully created' });

}
const signin = async (req, res) => {
    if(!req.body) return res.status(400).json({ error : 'No data' });

    const { email, password} = req.body;
    console.log(`Попытка авторизации: ${email}, ${password}`);


    const user = await User.findOne({ email });
    if(!user){
        return res.status(403).json({message : 'no email or incorrect password'});
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(403).json({message : 'no email or incorrect password'});
    }

    const secret = process.env.SECRET_KEY;
    const token = jwt.sign({ id : user._id, firstname : user.firstname, status : user.status }, secret, { expiresIn : '12h' });

    res.status(200).json({ token });
    
}

const me = async (req, res) => {
    const id = req.user.id;
    const user = await User.findById(id);
    if(!user) return res.status(404).json({ message : 'not found' });
    return res.status(200).json(user);
}

const deleteUser = async (req, res) => {
    User.destroy({id:req.params.id}).exec(function(err){
        if(err){
        res.send(500,{error: 'Error'})
        }
        res.redirect('/users/:id/delete');
    });
}

const user = async (req, res) => {
    let id = req.params.id;
    User.findById(id).then(user => {
        res.render('/users/:id/', {user});
    })
}

const all = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}
const profile = (req, res) => res.json({message : 'working...'});

module.exports = {
    signin,
    signup,
    profile,
    all,
    me,
    deleteUser,
    user
}