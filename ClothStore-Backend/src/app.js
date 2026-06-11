import express from 'express'
import cors from 'cors'
import router from './routes/user.router.js'
import productRouter from './routes/product.router.js'
import orderRouter from './routes/order.route.js'

const app = express()

app.use(cors({
    origin: [
        process.env.CORS_ORIGIN,
        process.env.CORS_ORIGIN_2,
    ],
    credentials: true
}))

app.use(express.json({limit: '16kb'}))               
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"))     // This is used to serve static files from the "public" directory (like images, css files, js files etc.)



// Routes
app.use('/api/user', router)
app.use('/api/product', productRouter)
app.use('/api/order',orderRouter)

export default app