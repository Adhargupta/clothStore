import mongoose from 'mongoose'
import { DB_NAME } from '../constant.js'

export const connectDB = async() => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`MongoDB Connected ✅ || DB hosts on ${connectionInstance}`);
        return connectionInstance
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
