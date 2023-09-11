const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema ({
    name : {
        type : String, 
        minLength : 5,
        maxLength : 50,
    },
    location : {
        type : String,
        length : 50
    },
    info : {
        type : String,
        length : 300,
    },
    file : {
        type: String, 
        required: trueы
    }
})

const pets = mongoose.model("Pets", petsSchema);

module.exports = pets;