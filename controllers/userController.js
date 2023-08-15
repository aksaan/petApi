const User = require("../models/user");

const signup = async (req, res) => {
    const { email, password, name, secondname } = req.body;
    const sameLogin = await User.findOne({ email });
    if(sameLogin){
        const user = new User({ email, password, name, secondname });
        await user.save();
        res.status(201).json({message : "user successfully created"});
    }
    else{
        res.status(409).json({message : "user with same email already registered"});
    }
}
const signin = async (req, res) => {
    const { email, password} = req.body;
    const sameLogin = await User.findOne({ email });
    if(sameLogin && sameLogin.password === password){
        res.status(200).json({message : "you successfully signin"});
    }
    else{
        res.status(403).json({message : "no email or incorrect password"});
    }
}
const deleteUser = async (req, res) => {
    User.destroy({id:req.params.id}).exec(function(err){
        if(err){
        res.send(500,{error: 'Error'})
        }
        res.redirect("/users/:id/delete");
    });
}

// const id = await User.findOne({ id });
// console.log(id);
// const users = await User.findOne({ id });
// res.status(200).json(users);

const user = async (req, res) => {
    let id = req.params.id;
    User.findById(id).then(user => {
        res.render("/users/:id/", {user});
    })
}

const all = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}
const profile = (req, res) => res.json({message : "working..."});

module.exports = {
    signin,
    signup,
    profile,
    all,
    deleteUser,
    user
}