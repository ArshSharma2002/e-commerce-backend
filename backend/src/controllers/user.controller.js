import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"

const generateAccessAndRefreshTokens = async (userId) => {
    try {

        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // storing refreshToken of user in the database
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating Tokens !!!")
    }
}

const registerUser = async (req, res)=>{

    // steps:
    // extract data sent by user from frontend
    // validate that data
    // check whether user already created or not (using email or username)
    // check for images (i.e. uploaded or not)
    // upload images to cloudinary
    // create user object and insert into DB
    // remove password and refreshtoken from the response after entry
    // check for user creation
    // return res
    
    const {fullname, username, email, password, phone, address} = req.body

    if ([fullname, username, email, password].some((field)=>{field?.trim() ===""})) {
        throw new ApiError(400, "All fields are required !!!")
    }

    const existedUser = await User.findOne({
        $or:[{username:username}, {email:email}]
    })
    
    if(existedUser){
        throw new ApiError(400, "User with this username or email already exists !!!")
    }


    const user = await User.create({
        fullname,
        username,
        email,
        password,
        phone,
        address

    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong, registering user !!!")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

}

const loginUser = async (req, res) => {
    try {

        const { email, username, password } = req.body

        if (!username && !email) {
            throw new ApiError(400, "Username or Email is required !!!")
        }

        const fetchedUser = await User.findOne({
            $or: [{ username }, { email }]
        })

        if (!fetchedUser) {
            throw new ApiError(404, "User doesn't exist !!!")
        }


        // methods created in userSchema can be only accessed via user created in the DB
        // you can not access these methods from 'User' model.
        const isPasswordValid = await fetchedUser.isPasswordCorrect(password)

        // const validPassword = await bcrypt.compare(password, getUser.password)

        if (!isPasswordValid) {
            throw new ApiError(401, "Incorrect Password !!!")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(fetchedUser._id)

        // yes, we can't send 'fetchedUser' as response coz this refrence doesn't have refreshToken field.
        // that's why we are again fetching the user for sending response to user.
        const loggedInUser = await User.findById(fetchedUser._id).select("-password -refreshToken")

        // options for cookies for security so, that only server can modify these cookies.
        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json(
            new ApiResponse(200, {
                user: loggedInUser,
                accessToken,
                refreshToken
            },
                "User logged in Successfully")
        )

    } catch (error) {
        console.error(error) 
    }
}

const logoutUser = async (req, res) => {
    // Steps:
    // clear cookies
    // clear refreshToken
    try {
        await User.findByIdAndUpdate(req.user._id, {
            // clearing refreshToken
            $set: { refreshToken: undefined }
        },
            {
                // so, that response will contain refreshToken: undefined (i.e. its new value)
                new: true
            })

        const options = {
            httpOnly: true,
            secure: true
        }

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json(new ApiResponse(200, {}, "User logged out Successfully !!!"))

    } catch (error) {
        console.error(error) 
    }
}

const getCurrentUser = async(req, res) =>{
    try {
        return res.status(200).json(
            new ApiResponse(200, req.user, "Current user fetched success !!!")
        )
    } catch (error) {
        console.error(error);
    }
}

// this endpoint is used when users access token get expire.
const refreshAccessToken = async (req, res) => {

    try {
        const existingRefreshToken = req.cookie?.refreshToken || req.body.refreshToken

        const decodedInfo = jwt.verify(existingRefreshToken, process.env.REFRESH_TOKEN_SECRET)

        if (!decodedInfo) {
            throw new ApiError(401, "Refresh token not verified !!!")
        }

        const user = await User.findById(decodedInfo?._id)
        if (!user) {
            throw new ApiError(401, "Invalid refresh token !!!")
        }

        if (existingRefreshToken !== user.refreshToken) {
            throw new ApiError(401, "Refresh token expired !!!")
        }

        const { accessToken, newRefreshToken } = generateAccessAndRefreshTokens(user._id)

        return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", newRefreshToken, options).json(
            new ApiResponse(
                200,
                {
                    accessToken, refreshToken: newRefreshToken
                },
                "Access token refreshed !!!"
            )
        )
    } catch (error) {
        console.error(error) 
    }



}




export { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser}