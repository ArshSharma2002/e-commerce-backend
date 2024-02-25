import { ApiError } from '../utils/ApiError.js' 
import { ApiResponse } from '../utils/ApiResponse.js' 

import {Order} from  '../models/order.model.js'
import {Cart} from  '../models/cart.model.js'


const placeOrder = async (req, res) => {
    try {
        const { user } = req 

        const cart = await Cart.findOne({ user: user._id }).populate("items.product") 

        if (!cart || cart.items.length === 0) {
            throw new ApiError(400, "Cart is Empty !!!")
        }

        const totalPrice = cart.items.reduce((total, item) => total + ( item.quantity*item.product.price), 0) 

        const order = new Order({
            user: user._id,
            items: cart.items.map(item => ({
                product: item.product._id,
                quantity: item.quantity,
            })),
            totalPrice: totalPrice
        }) 

        await order.save() 

        cart.items = [] 

        await cart.save() 

        res.status(200).json(new ApiResponse(200, order, "Order placed successfully !!!")) 

    } catch (error) {
        throw new ApiError(500, "Internal Server Error !!!")
    }
}

const getOrderDetails = async (req, res) => {
    try {
        const { orderId } = req.params 

        const order = await Order.findById(orderId) 

        if (!order) {
            throw new ApiError(400, "Order Id is required !!!")
        }

        res.status(200).json(new ApiResponse(200, order, "Order fetched successfully !!!")) 

    } catch (error) {
        throw new ApiError(500, "Internal Server Error !!!")
    }
}

const getOrderHistory = async (req, res) => {
    try {
        const { user } = req 

        const orders = await Order.find({ user: user._id }).populate("items.product") 

        res.status(200).json(new ApiResponse(200, orders, "Order history founded !!!")) 
        
    } catch (error) {
        new ApiError(500, "Internal server error !!!")
    }
}

export {placeOrder, getOrderDetails, getOrderHistory}