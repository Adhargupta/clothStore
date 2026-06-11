import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'

export const adminAuth = async (req, res, next)=>{
    try {
        const {token} = req.headers                     // Get the token

        if(!token){                                         // Check the token is empty
            throw new ApiError(402,"Not Authorized")
        }

        const token_decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)                // To decode token
        if(token_decode.role !== "admin"){
            throw new ApiError(401, "Not authorized")
        }          
        next()
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

