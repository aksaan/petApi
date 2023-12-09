import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from 'dotenv';
config();

export const auth = (req : Request, res : Response, next : NextFunction) => {
    const authHeader : string | undefined = req.headers['authorization'];
    const token : string | undefined = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    
    const secret : string = process.env.SECRET_KEY || "secret";
    try{
        const payload : PayloadUser = verify(token, secret) as PayloadUser;
        req.user = payload;
        next();
    } catch (err){
        return res.status(403).json({ error: 'Forbidden' });
    }
}