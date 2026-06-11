import { Router } from 'express'
import { 
    CashOnDelivery,
    Razorpay,
    OrderForAdmin,
    OrderForUser,
    updateOrderStatus,
    stripePayment,
    verifyStripe,
    verifyRazorpay
 } from '../controller/orders.controller.js'
import { adminAuth } from '../middleware/adminAuth.middleware.js'
import { verifyJWT } from '../middleware/auth.middleware.js'

 const orderRouter = Router()

 orderRouter.post('/COD',verifyJWT,CashOnDelivery)
 orderRouter.post('/Stripe',verifyJWT,stripePayment)
 orderRouter.post('/Razorpay',verifyJWT,Razorpay)

 orderRouter.post(
    "/verifyStripe",
    verifyJWT,
    verifyStripe
  );
orderRouter.post('/verifyRazorpay',verifyJWT,verifyRazorpay)

 orderRouter.get('/orderList',adminAuth,OrderForAdmin)
 orderRouter.post('/updateOrder',adminAuth,updateOrderStatus)
 orderRouter.post('/orderInfo',verifyJWT,OrderForUser)

 export default orderRouter
