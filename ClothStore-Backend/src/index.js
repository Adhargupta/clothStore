import './config/config.js'; // This executes dotenv.config() immediately
import { OS_CONFIG } from './config/config.js';
const port  = OS_CONFIG.port

import app from './app.js'

import { connectDB } from './db/index.js'
import { connectCloudinary } from './config/cloudinary.js';

const connectServer = async()=>{
    try {
        await connectDB()

        connectCloudinary()

        app.get('/',(req,res)=>{
            res.send("API WORKING")
        })
        app.listen(port || 8000, ()=>{
            console.log("Server started at PORT :"+port)
        })
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
connectServer()