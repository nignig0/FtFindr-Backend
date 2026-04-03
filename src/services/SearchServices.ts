import { v2 as Cloudinary } from 'cloudinary';
import { Page } from '../types';
import * as dotenv from 'dotenv';

dotenv.config();

const cloudVisionUrl = "https://vision.googleapis.com/v1/images:annotate"

const searchForImage = async (fileBuffer: Buffer, mimetype: string) => {
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
        console.log('Successfully searched for image. Response -> ', data);

        const pages = data.responses;
        console.log('The list of links -> ', JSON.stringify(pages));
        return [];
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

export const SearchServices = {
    searchForImage
}