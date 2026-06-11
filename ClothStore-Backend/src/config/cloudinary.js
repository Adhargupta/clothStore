import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

export const connectCloudinary = async(fileLocalPath)=>{
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    })
    try {
        if (!fileLocalPath) return null;
        const response = await cloudinary.uploader.upload(fileLocalPath,{
            resource_type: 'auto'
        })
        console.log(response);
        fs.unlinkSync(fileLocalPath)
        return response
    } catch (error) {
        fs.unlink(fileLocalPath)
        return null
    }
}