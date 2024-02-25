import { Router } from "express"
import {registerUser, loginUser, logoutUser, getCurrentUser} from "../controllers/user.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router = Router()


// user authentication routes
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.post("/logout", verifyJWT, logoutUser)
router.get("/getuser", verifyJWT, getCurrentUser)



export default router