import { Request, Response } from "express";
import { SearchServices } from "../services/SearchServices";

const search = async (req: Request, res: Response)=>{
    if(!req.file){
        res.status(400).send({
            message: "A file is needed!"
        });
        return;
    }
    try{
        const {file} = req;
        const pages = await SearchServices.searchForImage(file.buffer, file.mimetype);
        //potentially do some filtering here
        res.status(200).send({
            message: "Successfully searched for image",
            data: pages
        })
    }catch(err: any){
        console.log(err);
        res.status(500).send({
            message: "There was an error searching for image"
        });
    }
}

export const SearchController = {
    search
}