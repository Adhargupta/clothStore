import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    cartList: [
        {
          productID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          quantity: {
            type: Number,
            default: 1
          },
          size: {
            type: String,
            enum: ["S", "M", "L", "XL", "XXL"],
            required: true
          }
        }
    ],
    refreshToken:{
        type:String,
    }

},{
    timestamps:true,
    minimize:false
})

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function(password){
    const checkPassword = await bcrypt.compare(password,this.password)
    return checkPassword
}

userSchema.methods.generateAccessTokens = function(){                  // This is used to generate access token for user which is a passkey for user
    return jwt.sign(                                                           // Generate tokens using jsonwebtoken library carying user id and secret key and expiry time as payload
        {
            _id: this._id,                      // this._id is the id imported from mongoose which is unique for each user
            email: this.email,
            fullName: this.fullName,
        },
        process.env.ACCESS_TOKEN_SECRET,              // this is the secret key which is used to sign the token and should be kept secret and should be long and complex
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshTokens = function(){                  // This is used to generate refresh token for user i.e., when access token expires then we can use refresh token to generate new access token without asking user to login again
    return jwt.sign(                                                           // Generate tokens using jsonwebtoken library carying user id and secret key and expiry time as payload
        {
            _id: this._id,                      // this._id is the id imported from mongoose which is unique for each user
        },
        process.env.REFRESH_TOKEN_SECRET,              // this is the secret key which is used to sign the token and should be kept secret and should be long and complex
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.models.User || mongoose.model("User", userSchema)