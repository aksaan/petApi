import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { config } from "dotenv";

import Shelter, {IShelter} from "../models/shelter";
import Pet, {IPet} from "../models/pet";

config();

export const add = async (req : Request, res : Response) => {
    const { name, info, images } = req.body;
    if (!name || !info) {
        return res.status(404).json({ error : 'missing required fields'});
    }
    const owner : ObjectId = req.user.id;
    const shelter : IShelter | null = await Shelter.findOne({ owner });
    if(!shelter) return res.status(403).json({ message : 'forbidden' });

    const pet : IPet | null = new Pet({ name, info, images, shelter });
    await pet.save();

    return res.status(201).json(pet);
}

export const all = async (req : Request, res : Response) => {
    const pets = await Pet.find();
    res.status(200).json(pets);
}