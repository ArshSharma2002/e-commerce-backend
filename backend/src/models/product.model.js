import mongoose, { Schema } from 'mongoose'

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref:"Category",
        required: true,
        unique: true
    },
    brand:{
        type: String,
        required: true
    },
    price:{
        type: String,
        required: true
    },
    rating:{
        type: String,
        required: true
    }

})

export const Product = mongoose.model("Product", productSchema)