import { Request, Response } from "express";
import { ObjectId } from "mongoose";
import { config } from "dotenv";

import Shelter, {IShelter} from "../models/shelter";
import Address, {IAddress} from "../models/address";

config();


export const add = async (req : Request, res : Response) => {
    const { region, city, street, house } = req.body;
    if (!region || !city || !street || !house) {
        return res.status(404).json({ error : 'missing required fields'});
    }
    const owner : ObjectId = req.user.id;
    const shelter : IShelter | null = await Shelter.findOne({ owner });
    if(!shelter) return res.status(403).json({ message : 'forbidden' });
}