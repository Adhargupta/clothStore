import { v2 as cloudinary } from 'cloudinary'
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Product } from '../model/product.schema.js';
import { ApiResponse } from '../utils/ApiResponse.js';
// import { Product } from "../models/product.schema.js"

// Controller for adding product
const addProduct = async (req, res) => {
   try {
     // Step 1 : Take the data from the request
     // Step 2 : Check those data
     // Step 3 : Upload the image in the cloudinary and get the link
     // Step 4 : Upload this data in mongoDB
 
     // Step 1
     const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
     const image1 = req.files?.image1?.[0]
     const image2 = req.files?.image2?.[0]
     const image3 = req.files?.image3?.[0]
     const image4 = req.files?.image4?.[0]
 
     // Step 2
     if([name,description,price,category,subCategory,sizes,bestSeller].some((item)=>!item?.trim())){
         throw new ApiError(400,
             "All fields are required"
         )
     }
     if(!(image1 || image2 || image3 || image4)){
         throw new ApiError(400, "Upload the image of the product")
     }
 
     // Step 3
     const images = [image1, image2, image3, image4].filter((item)=>item!==undefined)
     const image_url = await Promise.all(                      // Multiple async operation together
         images.map(async(item)=>{
             let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
             return result.secure_url
         })
     )
 
     // Step 4
     const product = await Product.create({
         name,
         description,
         price: Number(price),
         category,
         subCategory,
         sizes: JSON.parse(sizes),
         bestSeller: bestSeller=="true"?true:false,
         date: Date.now(),
         image: image_url,
     })
   
     return res.status(200).json(
       new ApiResponse(
         200,
         product,
         'Product added'
       )
     );
   } catch (error) {
    console.log(error)

    return res.status(400).json({
       success: false,
       message: error.message
    })
}
};

// Controller for for list product
const listProduct = asyncHandler(async (req, res)=>{
    try {
        const products = await Product.find({})
        return res.status(201).json(
            new ApiResponse(
                201,
                products,
                "All the producr listed successfully"
            )
        )
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// Controller for removing product
const removeProduct = async(req,res)=>{
    try {
        // Step 1 : Take productId from the user
        // Step 2 : Find and delete the product
        // Step 3 : Check wether the product exist

        // Step 1
        const {productID} = req.body

        // Step 2
        const findProductToDelete = await Product.findByIdAndDelete(productID)

        // Step 3
        if(!findProductToDelete){
            throw new ApiError(
                404,
                "Product now found"
            )
        }

        return res.status(200).json(
            new ApiResponse(
                200,
                null,
                "Product Deleted successfully"
            )
        )
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}
// Controller for single product info
const productInfo = async(req, res)=>{
    try {
        // Step 1 : Take porduct Id from request
        // Step 2 : Match from DB products

        // Step 1
        const {productID} = req.body

        // Step 2
        const product = await Product.findById(productID)

        // Step 3
        if(!product){
            throw new ApiError(
                404,
                "Product not found"
            )
        }

        // Step 4
        return res.status(200).json(
            new ApiResponse(
                200,
                product,
                "Product found Successfully"
            )
        )
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

export {
    addProduct,
    listProduct,
    removeProduct,
    productInfo,

}