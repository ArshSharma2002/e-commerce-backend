import {Product} from "../models/product.model.js"
import {Cart} from "../models/cart.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const addToCart = async (req, res) => {
	try {
		const { productId, quantity } = req.body 
		const { user } = req

		const product = await Product.findById(productId)

		if (!product) {
			throw new ApiError(404,"Product not found !!!")
		}

		let cart = await Cart.findOne({ user: user._id }) 

		if (!cart) {
			cart = new Cart({
				user: user._id,
				items: []
			}) 
		}

		const existingItemIndex = cart.items.findIndex((item) => item.product.equals(productId)) 

		if (existingItemIndex !== -1) {
			cart.items[existingItemIndex].quantity += quantity 
		} else {
			cart.items.push({ product: productId, quantity }) 
		}

		await cart.save() 

		return res.status(200).json(new ApiResponse(200, cart, "item added to cart successfully !!!")) 

	} catch (error) {
        throw new ApiError(500, "Internal Server Error !!!")
	}
} 

const fetchCart = async (req, res) => {
	try {
		const { user } = req 

		const cart = await Cart.findOne({ user: user._id }).populate("items.product") 

		if (!cart || cart.items.length === 0) {
			return res.status(200).json({ message: "Cart is empty", cart: [] }) 
		}

		res.status(200).json(new ApiResponse(200, cart, "Cart fetched successfully !!!")) 

	} catch (error) {
        throw new ApiError(500, "Internal Server Error !!!")
	}
} 

const updateCartItem = async (req, res) => {
	try {
		const { cartItemId } = req.params 
		const { quantity } = req.body 

		const updatedCart = await Cart.findOneAndUpdate(
			{ "items._id": cartItemId },
			{ $set: { "items.$.quantity": quantity } }, 
			{ new: true } 
		) 

		if (!updatedCart) {
            throw new ApiError(404, "Item not found !!!")
		}

		return res.status(200).json(new ApiError(200, updatedCart, "Cart updated successfully !!!")) 

	} catch (error) {

        throw new ApiError(500, "Internal Server Error !!!")
	}
} 

const deleteCartItem = async (req, res) => {
	try {

		const { cartItemId } = req.params 
        
		const updatedCart = await Cart.findOneAndUpdate(

			{ $pull: { items: { _id: cartItemId } } }, 
			{ new: true } 
		) 

		if (!updatedCart) {
			return res.status(404).json({ message: "Cart item not found" }) 
		}

		return res.status(200).json(new ApiResponse(200, updatedCart, "cart items deleted successfully !!!")) 

	} catch (error) {
        throw new ApiError(500, "Internal Server Error !!!")
	}
}

export {addToCart, fetchCart, updateCartItem, deleteCartItem}
