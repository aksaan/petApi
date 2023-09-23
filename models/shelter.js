const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shelterSchema = new Schema ({
    title : {
        type : String, 
        minLength : 5,
        maxLength : 50,
    },
    ogrn : {
        type : Number,
        maxLength : 15,
        minLength : 13,
    },
    phone : {
        type : Number,
        length : 11,
    },
    email : {
        type : String,
        minLength : 5,
        maxLength : 100,
    },
    address : {
        type : String,
        minLength : 8,
        maxLength : 100,
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
        required : true,
    }, 
    desription : {
        type : String,
        maxLength : 300,
    }
})

const Shelter = mongoose.model("Shelter", shelterSchema);

module.exports = Shelter;