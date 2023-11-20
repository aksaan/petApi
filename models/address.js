const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const addressSchema = new Schema ({
    region : {
        type : String, 
        minLength : 3,
        maxLength : 50,
    },
    city : {
        type : String,
        length : 50,
    },
    street : {
        type : String,
        length : 50,
    },
    house : {
        type : String,
        length : 5,
    },
    flat : {
        type : String,
        length : 5,
    }, 
    description : {
        type : String,
        length : 300,
    }, 
    shelter : {
        type : Schema.Types.ObjectId,
        ref : "Shelter",
        required : true,
    },
    isMain : {
        type : Boolean,
        default : false,
    },
})

const Address = mongoose.model("Address", addressSchema);

module.exports = Address;