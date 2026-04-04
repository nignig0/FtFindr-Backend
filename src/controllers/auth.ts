import { Request, Response } from "express";
import { supabase } from "../supabase";

const register = async (req: Request, res: Response) => {
    const { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
        res.status(400).send({
            message: 'Email and password required!'
        });
        return;
    }

    try {
        const { data, error } = await supabase.auth.signUp({
            email, password, options: {
                data: {
                    firstName, lastName
                }
            }
        });

        if (error) {
            console.log('Error signing up -> ', error);
            res.status(400).send({
                message: 'There was an error signing up!'
            });
            return;
        }

        res.status(201).send({
            message: 'Successfully signed up!',
            data: {
                user: data.user,
                access_token: data.session?.access_token,
                refresh_token: data.session?.refresh_token,
                expires_in: data.session?.expires_in
            }
        });
    } catch (error) {
        console.log('Error signing up -> ', error);
        res.status(500).send({
            message: 'There was an error signing up!'
        });
    }
}

const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).send({
            message: 'Email and password required!'
        });
        return;
    }

    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email, password
        });

        if (error) {
            console.log('Error logging in -> ', error);
            res.status(400).send({
                message: 'There was an error logging in'
            });
            return;
        }
        

        res.status(200).send({
            message: 'Successfully logged in!',
            data: {
                user: data.user,
                access_token: data.session?.access_token,
                refresh_token: data.session?.refresh_token,
                expires_in: data.session?.expires_in
            }
        });
    } catch (error) {
        console.log('Error logging in -> ', error);
        res.status(500).send({
            message: 'There was an error logging in up!'
        });
    }
}

export const AuthController = {
    register, 
    login
}