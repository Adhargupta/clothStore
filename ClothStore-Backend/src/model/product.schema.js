import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    image:{
        type: [String],
        required: true,
    },
    category:{
        type: String,
        enum: ["Men","Women","Kids"],
        required: true,
    },
    subCategory:{
        type: String,
        enum: ["Topwear","Bottomwear","Winterwear"],
        required: true,
    },
    sizes:{
        type: [String],
        required: true,
    },
    bestSeller:{
        type:Boolean,
    },
    date:{
        type:Number,
        required:true,
    }
},{timestamps:true})

export const Product = mongoose.models.Product || mongoose.model("Product", productSchema)