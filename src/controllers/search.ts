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

const getWebPages = async (req: Request, res: Response) => {
    const imageUrl = req.query.imageUrl;

    if (typeof imageUrl !== "string" || imageUrl.trim().length === 0) {
        res.status(400).send({
            message: "A valid imageUrl query parameter is required!"
        });
        return;
    }

    try {
        const links = await SearchServices.getWebPages(imageUrl.trim());

        res.status(200).send({
            message: "Successfully fetched webpages for image",
            data: links
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).send({
            message: "There was an error getting webpages for image"
        });
    }
};

export const SearchController = {
    searchForVisuallySimilarImages,
    getWebPages
}
