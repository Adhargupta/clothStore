import { Router } from 'express'
import {
    addProduct,
    listProduct,
    removeProduct,
    productInfo
} from '../controller/product.controller.js'
import { upload } from '../middleware/multer.middleware.js'
import { adminAuth } from '../middleware/adminAuth.middleware.js';


const productRouter = Router()

productRouter.post(
    "/add",
    adminAuth,
    (req, res, next) => {
      console.log("Before multer");
      next();
    },
    upload.fields([
      { name: "image1", maxCount: 1 },
      { name: "image2", maxCount: 1 },
      { name: "image3", maxCount: 1 },
      { name: "image4", maxCount: 1 }
    ]),
    (req, res, next) => {
      console.log("After multer body:", req.body);
      console.log("After multer files:", req.files);
      next();
    },
    addProduct
  );


productRouter.post("/remove",adminAuth,removeProduct)
productRouter.route('/single').post(productInfo)
productRouter.route('/list').get(listProduct)


export default productRouter