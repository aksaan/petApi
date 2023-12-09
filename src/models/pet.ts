import mongoose, { Schema, Document } from "mongoose";

export interface IPet extends Document {
    name : string,
    info : string,
    images : string,
    shelter : Schema.Types.ObjectId,
    type : Schema.Types.ObjectId,
}

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

const Pets = mongoose.model<IPet>("Pets", petsSchema);

export default Pets;