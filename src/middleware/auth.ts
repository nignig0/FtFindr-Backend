import { NextFunction, Request, Response } from "express";
import { supabase } from "../supabase";

export const verifyToken = async(req: Request, res: Response, next: NextFunction)=>{
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        res.status(401).send({
            message: "Token required!"
        });
        return;
    }

    const {data, error} = await supabase.auth.getUser(token);
    if(error){
        console.log('Error verifying token -> ', error);
        res.status(401).send({
            message: 'Token not valid!'
        });
        return;
    }

    req.user = data.user;
    next();
}