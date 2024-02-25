import { Router } from "express"
import {placeOrder, getOrderDetails, getOrderHistory} from "../controllers/order.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()

// Routes for order management
router.get('/placeorder', verifyJWT, placeOrder)
router.get('/orderdetails/:orderId', verifyJWT, getOrderDetails) 
router.get('/orderhistory', verifyJWT, getOrderHistory) 

export default router