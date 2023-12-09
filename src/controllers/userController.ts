import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { ObjectId } from "mongoose";
import { sign } from "jsonwebtoken";
import { config } from "dotenv";


import User, { IUser } from "../models/user";

config();

export const signup = async (req : Request, res : Response) => {
    if(!req.body) return res.status(400).json({ error : 'No data' });

    const { email, password, firstname, secondname } = req.body;

    const sameLogin : IUser | null = await User.findOne({ email });
    if(sameLogin){
        return res.status(409).json({ error : 'user with same email already registered'});
    }

    const hashed : string = await hash(password, 10);
    const user : IUser = new User({ email, password : hashed, firstname, secondname });
    await user.save();

    return res.status(201).json({ message : 'user successfully created' });

}

export const signin = async (req : Request, res : Response) => {
    if(!req.body) return res.status(400).json({ error : 'No data' });

    const { email, password} = req.body;
    console.log(`Попытка авторизации: ${email}, ${password}`);


    const user : IUser | null = await User.findOne({ email });
    if(!user){
        return res.status(403).json({message : 'no email or incorrect password'});
    }

    const isPasswordCorrect : boolean = await compare(password, user.password);
    if(!isPasswordCorrect){
        return res.status(403).json({message : 'no email or incorrect password'});
    }

    const secret : string = process.env.SECRET_KEY || "secret";
    const token : string = sign({ id : user._id, firstname : user.firstname, status : user.status }, secret, { expiresIn : '12h' });

    return res.status(200).json({ token });
    
}

export const me = async (req : Request, res : Response) => {
    if (req.user){
        const id : ObjectId = req.user.id;
        const user : IUser | null = await User.findById(id);
        if(!user) return res.status(404).json({ message : 'not found' });
        return res.status(200).json(user);
    }
    return res.status(403).json({ error: 'Forbidden' });
}

export const all = async (req : Request, res : Response) => {
    const users : IUser[]  = await User.find();
    return res.status(200).json(users);
}