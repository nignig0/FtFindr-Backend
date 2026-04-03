import { Request, Response } from "express";
import { SearchServices } from "../services/SearchServices";

const searchForVisuallySimilarImages = async (req: Request, res: Response)=>{
    if(!req.file){
        res.status(400).send({
            message: "A file is needed!"
        });
        return;
    }
    try{
        const {file} = req;
        const imgLinks = await SearchServices.searchForVisuallySimilarImage(file.buffer, file.mimetype);

        res.status(200).send({
            message: "Successfully searched for image",
            data: imgLinks
        })
    }catch(err: any){
        console.log(err);
        res.status(500).send({
            message: "There was an error searching for image"
        });
    }
}

export const SearchController = {
    searchForVisuallySimilarImages
}