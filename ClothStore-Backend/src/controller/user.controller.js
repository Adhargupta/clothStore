import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../model/user.schema.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import validator from 'validator'
import jwt from 'jsonwebtoken'

const generateWebToken = async(userId)=>{
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessTokens()
        const refreshToken = user.generateRefreshTokens()

        user.refreshToken = refreshToken
        await user.save({validateBeforeSave: false})

        return {accessToken, refreshToken}
    } catch (error) {
        console.log(error);
        throw new ApiError(500, "Something went wrong while generating tokens")
    }
}
const login = async (email, password) => {

    // Step 2
    if(!email || !password){
        throw new ApiError(
            400,
            "All the fieds are required"
        )
    }

    // Additional
    if(!validator.isEmail(email)){
        throw new ApiError(
            400,
            "Wrong email format"
        )
    }

    // Step 3
    const user = await User.findOne({                           // Returns full object
        $or: [{email}]
    })
    if(!user){
        throw new ApiError(
            404,
            "Wrong Email address"
        )
    }
    const comparePassword = await user.isPasswordCorrect(password)
    if(!comparePassword){
        throw new ApiError(
            401,
            "Password is incorrect"
        )
    }
    return user
 }


// For user login
const loginUser = asyncHandler(async(req,res)=>{
    // Step 1 : Take the user input
    // Step 2 : Check the input fied data type and is it null?
    // Additional -> Validate Email format
    // Step 3 : Check the password and Email
    // Step 4 : Generate access and refresh tokens
    // Step 5 : return Response as Cookies

    // Step 1 
    const {email, password} = req.body

    // Step 2 + 3
    const user = await login(email, password)

    // Step 4 
    const {accessToken, refreshToken} = await generateWebToken(user._id)
    const options = {
        httpOnly: true,
        secure: true
    }

    // Step 5
    const loggedInUserDetail = await User.findById(user._id).select('-password')
    return res.status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200,
            {
                user: loggedInUserDetail, accessToken, refreshToken
            },
            "User logged in successfully"
    ))
})

// For user register
const registerUser = async(req,res)=>{
    // Step 1 : Take the data from response
    // Step 2 : ChecK wether it is empty or not
    // Step 3 : Validate email and password length
    // Step 4 : Match wether user already exist
    // Step 5 : bcrypt the password                     (Already in the schema we have done it)
    // Additional : Add cartList empty array
    // Step 6 : Create object then Store it in DB
    // Step 7 : Send response 

    // Step 1
    const {email, password, fullName} = req.body

    // Step 2
    
    if([fullName,email,password].some(field => !field?.trim())){
        throw new ApiError(400,"All fields are required")
    }

    // Step 3
    if(!validator.isEmail(email)){
        throw new ApiError(
            400,
            "Enter Valid Email"
        )
    }
    if(password.length<6){
        throw new ApiError(
            400,
            "Enter Strong Password"
        )
    }

    // Step 4
    const userExist = await User.findOne({email})
    if(userExist){
        throw new ApiError(
            401,
            "User Aready Exists"
        )
    }

    // Addtional
    const cartList = []

    // Step 5
    const user = await User.create({
        fullName,
        email: email.toLowerCase(),
        password,
        cartList
    })

    // Step 6
    const response = await User.findById(user._id).select("-password")
    if(!response){
        throw new ApiError(
            500,
            "Something went wrong in Server"
        )
    }
    return res.status(201).json({
        success: true,
        message: "User Created Successfully",
        data: response
    });
}

// For Adding product in cartList
const addToCartList = async(req,res)=>{
    // Step 1: Take user id adn product id from req
    // Step 2: Validate them
    // Step 3: Find that user id from mongoDB
    // Step 4: If matched add to cartList

    // Step 1
    const {userID,productID,size} = req.body

    // Step 2
    if(!userID||!productID){
        throw new ApiError(
            401,
            "Enter correct data"
        )
    }
    const validSizes = ["S", "M", "L", "XL", "XXL"]
    const productSize = validSizes.includes(size) ? size : "S"

    // Step 3
    const user = await User.findById(userID)
    if(!user){
        throw new ApiError(404,"User not found")
    }

    // Step 4
    const existingProduct = user.cartList.find(
        (item) => item.productID && item.productID.toString() === productID && item.size === productSize  // ✅ null check
    )
    if(existingProduct){
        existingProduct.quantity += 1
    }else{
        user.cartList.push({ productID, quantity: 1,size:productSize })
    }
    await user.save()

    return res.status(200).json({
        success:true,
        message:"Cart updated successfully"
    })
}

// Display cartList items
const dispayCartList = async(req,res)=>{
    try {
        const {userID} = req.body
        if(!userID){
            throw new ApiError(404,"Enter user id")
        }
        const existedUser = await User.findById(userID)
        if(!existedUser){
            throw new ApiError(404, "User not found")
        }
        const userCartList = existedUser.cartList
        if(!userCartList){
            throw new ApiError(500, "Something went wrong")
        }
        return res.status(200).json(
            new ApiResponse(200,userCartList,'Succesful')
        )
    } catch (error) {
        console.log(error);
    }
}

// For Removing product in cartList
const removeToCartList = async(req,res)=>{
    // Step 1: take user id and product id from user
    // Step 2: find the user in mongoDB
    // Step 3: find the product in user.cartList by productID
    // Step 4: Filter it 

    // Step 1
    const {userID, productID} = req.body
    // Step 2
    if(!userID || !productID){
        throw new ApiError(401,"Enter All Fields")
    }

    // Step 3
    const user = await User.findById(userID)
    if(!user){
        throw new ApiError(404,"User not found")
    }

    // Step 4
    user.cartList = user.cartList.filter(
        (item) => item.productID.toString() !== productID
      );    
    await user.save()

    return res.status(200).json({
        success:true,
        message:"Cart updated successfully"
    })
}

// For quantity of cartList product
const quantityCartListProduct = async(req,res)=>{
    const {userID, productID, size, quantity} = req.body

    // if(!(userID&&productID&&size&&quantity)){
    //     throw new ApiError(401,"All fields are required")
    // }

    if (!userID) {
        throw new ApiError(401, "User ID is required");
    }
    
    if (!productID) {
        throw new ApiError(401, "Product ID is required");
    }
    
    if (!size) {
        throw new ApiError(401, "Size is required");
    }
    
    if (!quantity) {
        throw new ApiError(401, "Quantity is required");
    }

    const user = await User.findById(userID)
    if(!user){
        throw new ApiError(404,"User not found")
    }
    const product = user.cartList.find((item)=>item.productID.toString() === productID && item.size === size)
    if(!product){
        throw new ApiError(404,'Product not found')
    }
    product.quantity = quantity
        
    await user.save()
        
    return res.status(200).json({
        success: true,
        message: "Quantity updated"
      });
}

// For admin login
const adminLogin = async(req, res)=>{
    try {

        const { email, password } = req.body
        if(
            email !== process.env.ADMIN_EMAIL ||
            password !== process.env.ADMIN_PASSWORD
        ){
            throw new ApiError(401, "Invalid admin credentials")
        }

        const token = jwt.sign(
                { 
                    email,
                    role: "admin"
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "1d" }
            )
 
        return res.status(200).json(
            new ApiResponse(
                200,
                token,
                "Admin Access Granted"
            )
        )

    } catch (error) {

        console.log(error)

        return res.status(404).json({
            success: false,
            message: error.message
        })
    }
}

export {
    loginUser,
    registerUser,
    addToCartList,
    removeToCartList,
    dispayCartList,
    adminLogin,
    quantityCartListProduct,
}
