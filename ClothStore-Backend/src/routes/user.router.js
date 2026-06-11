import {Router} from 'express'
import { registerUser,loginUser,adminLogin, addToCartList, removeToCartList, dispayCartList, quantityCartListProduct } from '../controller/user.controller.js'

const router = Router()
router.route('/register').post(
    registerUser
)
router.route('/login').post(
    loginUser
)
router.post('/cartlist',addToCartList)
router.post('/cartRemove',removeToCartList)
router.post('/listProduct',dispayCartList)
router.post('/quantity',quantityCartListProduct)
router.route('/admin').post(
    adminLogin
)
export default router