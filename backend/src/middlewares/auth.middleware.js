import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"

// this middleware will be used for user authentication & we will check for accesstoken in the cookies coz if user is once logged in then cookies will definetely contain accessToken & if accessToken is there then we will verify it by ACCESS_TOKEN_SECRET and we will get decodedInfo (i.e logged in users data) then we can easily send this data thought 'req' object as 'req.user' so, that user can be identified.

export const verifyJWT = async(req, res, next)=>{
    try {
        // extract the token from the stored cookies or from the Authorization header.
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")
        console.log("Token Val : " + token);
        
        if (!token) {
            throw new ApiError(401, "Unauthorized request !!!")
        }

        console.log("got token .....");
    
        // 'decodedInfo' will be the user data we provided while generating accessToken
        const decodedInfo = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedInfo?._id).select("-password -refreshToken")
    
        if (!user) {
            // TODO: about frontend.
            throw new ApiError(401, "Invalid access token !!!")
        }
    
        req.user = user
    
        next()

    } catch (error) {
        throw new ApiError(401,error?.message || "Auth Middleware error")
    }
}