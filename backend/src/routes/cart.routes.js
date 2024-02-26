import { Router } from "express"
import {addToCart, fetchCart, updateCartItem, deleteCartItem} from "../controllers/cart.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()


// cart management routes
router.post('/addtocart', verifyJWT, addToCart);
router.get('/fetchcart', verifyJWT, fetchCart);
router.put('/updatecartitems/:cartItemId', verifyJWT, updateCartItem);
router.delete('/deletecartitems/:cartItemId', verifyJWT, deleteCartItem);

export default router