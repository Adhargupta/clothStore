import { ApiError } from "../utils/ApiError.js"
import { Order } from "../model/order.schema.js"
import { User } from "../model/user.schema.js"
import { Stripe } from 'stripe'
import razorpay from 'razorpay'

// global variables
const currency = "usd";
const deliveryCharge = 20
// get way initiallize
const stripe = new Stripe(process.env.STRIPE_SECRET)

// Placing Orders using COD
const CashOnDelivery = async(req,res)=>{
    // Step 1:
    try {
        const {userID,products,amount,address,fullName,contact} = req.body
        if (
            !userID ||
            !amount ||
            !fullName||
            !contact||
            !products ||
            products.length === 0
          ) {
            throw new ApiError(401, "Enter all values");
          }
          if (
            !address ||
            !address.street ||
            !address.city ||
            !address.state ||
            !address.zipCode ||
            !address.country
          ) {
            throw new ApiError(401,"Enter complete address")
          }
        const orderData = {
            userID,
            products,
            amount,
            fullName,
            contact,
            address,
            paymentMethod:"COD",
            payment:false,
            status: "Order placed",
            date:Date.now()
        }
        const cod = await Order.create(orderData)
        if(!cod){
            throw new ApiError(500,"Something went wrong")
        }
        await cod.save()
        await User.findByIdAndUpdate(userID,{cartList:[]})
        return res.status(200).json({success:true,message:"Order Placecd"})
    } catch (error) {
        console.log(error);
        return res.json({success:false, message:error.message})
    }
}

// Placing Orders using Stripe
const stripePayment = async(req,res)=>{
  try {
    const {userID,products,amount,address,fullName,contact} = req.body
    const {origin} = req.headers;

    if (
      !userID ||
      !amount ||
      !fullName||
      !contact||
      !products ||
      products.length === 0
    ) {
      throw new ApiError(401, "Enter all values");
    }
    if (
      !address ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !address.country
    ) {
      throw new ApiError(401,"Enter complete address")
    }
    const orderData = {
        userID,
        products,
        amount,
        fullName,
        contact,
        address,
        paymentMethod:"Stripe",
        payment:false,
        status: "Order placed",
        date:Date.now()
    }
    const orderedItem = await Order.create(orderData)

    // ******************* Payment Logic for Stripe ******************* //
    const line_items = products.map((item)=>(
      {
        price_data:{
          currency: currency,
          product_data:{
            name:item.name
          },
          unit_amount: item.price*100
        },
        quantity:item.quantity
      }
    ))
    line_items.push({
      price_data:{
        currency:currency,
        product_data:{
          name:"Delivery Charges"
        },
        unit_amount:deliveryCharge*100
      },
      quantity:1
    })
    const session = await stripe.checkout.sessions.create({
      success_url : `${origin}/verify?success=true&orderID=${orderedItem._id}`,
      cancel_url : `${origin}/verify?success=false&orderID=${orderedItem._id}`,
      line_items,
      mode:`payment`
    })
    return res.json({success:true,session_url:session.url})
  } catch (error) {
    console.log(error.message);
    return res.json({success:false,message:error.message})
  }
}

const verifyStripe = async (req, res) => {
  try {
    const { orderID, success } = req.body;

    if (!orderID) {
      throw new ApiError(400, "Order ID required");
    }

    if (success === "true") {
      const order = await Order.findById(orderID);

      if (!order) {
        throw new ApiError(404, "Order not found");
      }

      await Order.findByIdAndUpdate(
        orderID,
        { payment: true }
      );

      await User.findByIdAndUpdate(
        order.userID,
        { cartList: [] }
      );

      return res.json({
        success: true,
        message: "Payment verified"
      });
    }

    await Order.findByIdAndDelete(orderID);

    return res.json({
      success: false,
      message: "Payment cancelled"
    });

  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message
    });
  }
};

// Order for Adimn Panel
const OrderForAdmin = async(req,res)=>{
  try {
    const order = await Order.find({})
    return res.status(200).json({
      success:true,
      order
    })
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }
}

// Order state change by Admin
const updateOrderStatus = async(req,res)=>{
  try {
    const {orderID, status} = req.body

    if(!(status && orderID)){
      throw new ApiError(401,"Enter required value")
    }

    const updatedOrder = await Order.findByIdAndUpdate(orderID, {status})
    if(!updatedOrder){
      throw new ApiError(404,"Order not found")
    }

    return res.status(200).json({
      success:true,
      message:"Status updated successfully"
    })

  } catch (error) {
    console.log(error);
    return res.json({
      success:false,
      message:error.message
    })
  }
}

const OrderForUser = async (req, res) => {
  try {
    const { userID } = req.body

    if (!userID) {
      throw new ApiError(401, "Enter correct userID")
    }

    const orders = await Order.find({ userID })   // ← renamed variable
    return res.status(200).json({ success: true, message:"User Order Page",data: orders })  // ← now sends "orders"
  } catch (error) {
    console.log(error)
    res.status(400).json({ success: false, message: error.message })
  }
}


const razorpayInstance = new razorpay({
  key_id : process.env.RAZORPAY_ID,
  key_secret:process.env.RAZORPAY_SECRET,
})

// Placing Orders using Razorpay
const Razorpay = async(req,res)=>{
  try {
    const {userID,products,amount,address,fullName,contact} = req.body
    const {origin} = req.headers;
    if (
      !userID ||
      !amount ||
      !fullName||
      !contact||
      !products ||
      products.length === 0
    ) {
      throw new ApiError(401, "Enter all values");
    }
    if (
      !address ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.zipCode ||
      !address.country
    ) {
      throw new ApiError(401,"Enter complete address")
    }
    const orderData = {
      userID,
      products,
      amount,
      fullName,
      contact,
      address,
      paymentMethod:"Razorpay",
      payment:false,
      status: "Order placed",
      date:Date.now()
    }
    const orderedItem = await Order.create(orderData)

    // ****************** Payment Logic for Razorpay ******************* //
    const options = {
      amount:amount*100,
      currency:currency.toUpperCase(),
      receipt : orderedItem._id.toString()
    }

    await razorpayInstance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.json({success:false, message:error})
      }
      res.json({success:true,order})
    })

  } catch (error) {
      console.log(error);
      return res.json({success:false, message:error})
  }
}

const verifyRazorpay = async(req,res)=>{
  try {
    const {userID,razorpay_order_id} = req.body
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
    const order = await Order.findById(orderInfo.receipt);

    if(!order){
      throw new ApiError(404,"Order ont found")
    }

    if (orderInfo.status==="paid") {
      await Order.findByIdAndUpdate(orderInfo.receipt,{payment:true})
      await User.findByIdAndUpdate(order.userID,{cartList:[]})
      return res.json({success:true, message:"Payment Successful"})
    }
  } catch (error) {
    console.log(error);
    return res.json({success:false,message:"Payment failed"})
  }
}

export {
    CashOnDelivery,
    stripePayment,
    Razorpay,
    OrderForAdmin,
    OrderForUser,
    updateOrderStatus,
    verifyStripe,
    verifyRazorpay
}