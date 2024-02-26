import { Router } from "express"
import {placeOrder, getOrderDetails, getOrderHistory} from "../controllers/order.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()

// order management routes
router.post('/placeorder', verifyJWT, placeOrder)
router.get('/orderdetails/:orderId', verifyJWT, getOrderDetails) 
router.get('/orderhistory', verifyJWT, getOrderHistory) 

export default router