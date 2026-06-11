import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    userID:{
        type: String,
        required:true,
        trim:true,
    },
    products: [
        {
          productID: {
            type: String,
            required: true
          },
          name: {
            type: String,
            required: true
          },
          image: [String],
          price: {
            type: Number,
            required: true
          },
          quantity: {
            type: Number,
            required: true
          },
          selectedSize: {
            type: String,
            required: true
          }
        }
    ],
    fullName:{
      type:String,
      required:true,
      trim:true
    },
    contact:{
      type:Number,
      required:true
    },
    amount:{
        type:Number,
        required: true,
    },
    address:{
      street:{
        type:String,
        required:true
      },
      city: {
        type:String,
        required:true
      },
      state: {
        type:String,
        required:true
      },
      zipCode: {
        type:Number,
        required:true
      },
      country: {
        type:String,
        required:true
      }
    },
    status:{
        type:String,
        required:true,
        default:"Order placed",
        enum:["Order placed","Processing","Shipped","Out For Deliver","Delivered"]
    },
    paymentMethod:{
        type:String,
        required:true,
        enum:["Stripe","Razorpay","COD"]
    },
    payment:{
        type:Boolean,
        required:true,
        default:false,
    },
    date:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const Order = mongoose.models.Order || mongoose.model("Order",orderSchema)