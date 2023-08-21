const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    firstname : {
        type : String,
        minLength : 3,
        maxLength : 25,
    },
    secondname : {
        type : String,
        maxLength : 25,
        required : false
    },
    email : {
        type : String,
        minLength : 5,
        maxLength : 100,
    },
    password : {
        type : String,
        minLength : 8,
        maxLength : 100,
    },
    status : {
        type : Number,
        min : 1,
        max : 5,
        default : 5
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;