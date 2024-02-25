import { Router } from "express"
import {addToCart, fetchCart, updateCartItem, deleteCartItem} from "../controllers/cart.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()


// Routes for cart management
router.post('/addtocart', verifyJWT, addToCart);
router.get('/getcart', verifyJWT, fetchCart);
router.put('/updatecart/:cartItemId', verifyJWT, updateCartItem);
router.delete('/deletecartitems/:cartItemId', verifyJWT, deleteCartItem);

export default router