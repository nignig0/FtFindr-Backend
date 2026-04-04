import { Request, Response } from "express";
import { SearchServices } from "../services/SearchServices";
import { History } from "../types";
import { HistoryService } from "../services/HistoryService";

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
        const links: string[] = await SearchServices.getWebPages(imageUrl.trim());
        const userId = req.user?.id;
        const history: Partial<History>[] = links.map((link)=>{
            return {
                uid: userId, 
                imageurl: imageUrl,
                vendorurl: link,
                createdat: new Date()
            }
        });

        await HistoryService.bulkAddToHistory(history);

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
