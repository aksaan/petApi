const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petTypeSchema = new Schema ({
    title : {
        type : String, 
        minLength : 5,
        maxLength : 50,
    },
    icon : {
        type: String, 
        required: true,
    },
})

const PetType = mongoose.model("PetType", petTypeSchema);

module.exports = PetType;