import { Router } from "express"
import {fetchProducts, fetchProductById, fetchProductsByCategory, fetchCategories, createCategory, createProduct} from "../controllers/product.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()

// product category and product management

// router.post("/createcategory", verifyJWT, createCategory) 
router.get("/allcategories", verifyJWT, fetchCategories) 
// router.post("/createproduct", verifyJWT, createProduct) 
router.get("/allproducts", verifyJWT, fetchProducts) 
router.get("/productbycategory/:category", verifyJWT, fetchProductsByCategory) 
router.get("/productbyid/:productId", verifyJWT, fetchProductById) 

export default router