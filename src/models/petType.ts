import mongoose, { Schema, Document } from "mongoose";

export interface IPetType extends Document {
    title : string,
    icon : string,
}

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

const PetTypeSchema = mongoose.model<IPetType>("TypePet", petTypeSchema);

export default PetTypeSchema;