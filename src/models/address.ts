import mongoose, { Schema, Document } from "mongoose";

export interface IAddress extends Document {
    region : string,
    city : string,
    street : string,
    house : string,
    flat : number,
    description : string,
    shelter : Schema.Types.ObjectId,
    isMain : boolean,
}

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
        type : Number,
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

const Address = mongoose.model<IAddress>("Address", addressSchema);

export default Address;