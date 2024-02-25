import { Router } from "express"
import {registerUser, loginUser, logoutUser, getCurrentUser} from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()


// Routes for cart management
router.post('/addtocart', verifyJWT, addToCart);
router.get('/getcart', verifyJWT, getCart);
router.put('/updatecart/:cartitemId', verifyJWT, updateCartItem);
router.delete('/deletecartitems/:cartitemId', verifyJWT, deleteCartItem);
