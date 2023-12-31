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
    shelter : {
        type : Schema.Types.ObjectId,
        ref : "Shelter",
        required : true,
    },
    type : {
        type : Schema.Types.ObjectId,
        ref : "PetType",
        required : true,
    }, 
})

const Pet = mongoose.model("Pet", petsSchema);

module.exports = Pet;