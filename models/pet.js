const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petsSchema = new Schema ({
    name : {
        type : String, 
        minLength : 5,
        maxLength : 50,
    },
    info : {
        type : String,
        length : 300,
    },
    images : {
        type: String, 
        required: true,
    },

})

const pets = mongoose.model("Pets", petsSchema);

module.exports = pets;