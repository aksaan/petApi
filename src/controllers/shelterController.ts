import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { config } from "dotenv";

import User, { IUser } from "../models/user";
import Shelter, {IShelter} from "../models/shelter";

config();

export const add = async (req : Request, res : Response) => {
    console.log(req.file)
    const { ogrn, title, email, phone, desription } = req.body;
    if (!ogrn || !title || !email) {
        return res.status(404).json({ error : 'missing required fields'});
    }
    
    if (!req.user) return res.status(403).json({ error: 'Forbidden' });
    const owner : ObjectId = req.user.id;
    const sameOwner : IShelter | null = await Shelter.findOne({ owner });
    if (sameOwner){
        return res.status(409).json({ error : 'shelter with same owner already registered'});
    }

    const shelter : IShelter | null = new Shelter({ owner, email, ogrn, title, phone, desription});
    await shelter.save();

    return res.status(201).json(shelter);
}

export const avatar = async (req : Request, res : Response) => {
    if(!req.file) return res.status(401).json({ error : "no file" });

    const avatar = req.file;
    const id : string = req.params.id;
    const shelter : IShelter | null = await Shelter.findById(id);

    if (!shelter) return res.status(404).json({message : 'not found'})

    if (!req.user) return res.status(403).json({ error: 'Forbidden' });
    if(shelter.owner.valueOf() !== req.user.id) return res.status(403).json({ message : 'forbidden' });

    await Shelter.updateOne({_id : id}, {avatar : avatar.path});

    return res.status(200).json({message : 'successfully changed'})

}

export const one = async (req : Request, res : Response) => {
    const id : string = req.params.id;
    const shelter : IShelter | null = await Shelter.findById(id);
        
    if(shelter) return res.status(200).json(shelter);

    return res.status(404).json({ error : 'shelter not found'});
}

export const all = async (req : Request, res : Response) => {
    const shelters = await Shelter.find();
    res.status(200).json(shelters);
}

export const remove = async (req : Request, res : Response) => {
    const id : string = req.params.id;
    const shelter : IShelter | null  = await Shelter.findById(id)
    if(!shelter) return res.status(404).json({ message : 'shelter not found' });
    
    if(shelter.owner.valueOf() !== req.user.id) return res.status(403).json({ message : 'forbidden' });

    await Shelter.deleteOne({ _id : id });
    res.status(202).json(shelter);
}
