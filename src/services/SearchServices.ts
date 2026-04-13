import { v2 as Cloudinary } from 'cloudinary';
import * as dotenv from 'dotenv';

dotenv.config();

const cloudVisionUrl = "https://vision.googleapis.com/v1/images:annotate"

const searchForVisuallySimilarImage = async (fileBuffer: Buffer, mimetype: string) => {
    const image = `data:${mimetype};base64,${fileBuffer.toString('base64')}`;
    const imageUrl = await addImageToCloudinary(image);

    const request = {
        requests: [
            {
                image: { source: { imageUri: imageUrl } },
                features: [{ type: "WEB_DETECTION" }]
            }
        ]
    };

    const response = await fetch(`${cloudVisionUrl}?key=${process.env.CLOUD_VISION_API_KEY!}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request)
    });



    if (response.ok) {
        const data = await response.json();
        const dataArray = Array.from(data.responses) as any[];
        const imgLinks = dataArray.map((r: any) => {
            const images = r.webDetection.visuallySimilarImages;
            return images.map((i: any) => i.url);
        }).flat();


        console.log('The list of links -> ', imgLinks);
        return imgLinks;
    }
    console.log(response);
    throw Error("Error fetching pages");

}

const addImageToCloudinary = async (image: string) => {
    Cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
        api_key: process.env.CLOUDINARY_API_KEY!,
        api_secret: process.env.CLOUDINARY_API_SECRET!,
    });
    const upload = await Cloudinary.uploader.upload(image);
    return upload.secure_url;
}

const getWebPages = async (imageUrl: string)=>{
    const apiEndpoint = "https://serpapi.com/search?engine=google_lens";
    const response = await fetch(`${apiEndpoint}&url=${imageUrl}&api_key=${process.env.SERP_API_KEY!}`);
    if(!response.ok){
        console.log(await response.text());
        throw Error('Error getting web pages');
    }

    const data = await response.json();
    const links = data.visual_matches.map((result: any)=> result.link).slice(0, 5);

    return links;
}

export const SearchServices = {
    searchForVisuallySimilarImage,
    getWebPages
}