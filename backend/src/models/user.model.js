import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // for search optimization
    },
    fullname:{
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        index: true // for search optimization
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // for search optimization
    },
    phone:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    refreshToken:{
        type: String
    }
}, { timestamps: true})

userSchema.pre("save", async function(next){
    if (this.isModified("password")) {                // here, 'this' refers to the userSchema.
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

// creating instance method 'isPasswordCorrect' to check & verify that the passwords are correct or not.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({
        _id: this._id,
        username: this.username,
        fullname: this.fullname,
        email: this.email
    }, 
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    })
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}

export const User = mongoose.model("User",userSchema)