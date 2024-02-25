import {Category} from "../models/category.model.js"
import {Product} from "../models/product.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"


const createCategory = async (req, res) => {
	try {

        const {categoryname} = req.body
		
        if (!categoryname) {
            throw new ApiError(400, "Category name is required !!!")
        }
        
        // Create the category
		const category = new Category({
			categoryname
		});

		// Save the category to the database
		await category.save();

		// Return success message
		return res.status(200).json(new ApiResponse(200, category, "Category created successfully !!!"));

	} catch (error) {

        throw new ApiError(500, "Internal Server Error !!!")
	}
}

const fetchCategories = async (req, res) => {
	try {

		const categories = await Category.find({}, "categoryname") 

		return res.status(200).json(new ApiResponse(200, categories, "Categories fetched Successfully !!!")) 

	} catch (error) {
        throw new ApiError(500, "Internal Server Error !!!")
	}
}  

const createProduct = async (req, res) => {
	try {

        const {name, description, price, brand, category, rating} = req.body

		// Check if the category exists
		const existingCategory = await Category.findOne({ categoryname: category });

		if (!existingCategory) {
			throw new ApiError(404, "Product category not found !!!")
		}


        // Create the product
		const product = new Product({
            name,
            description,
            category:category._id,
            brand,
            price,
            rating
		});

		await product.save();


		// const product = await Product.create({
        //     name,
        //     description,
        //     category:category._id,
        //     brand,
        //     price,
        //     rating
            
        // })
        

		return res.status(200).json(new ApiResponse(200, product, "Product created successfully !!!"))

	} catch (error) {
        throw new ApiError(500, "Internal Server Error !!!")
	}
}

const fetchProductsByCategory = async (req, res) => {
	try {
		const { category } = req.params
        
        console.log("PARAMS : " , category)

        if (!category) {
            throw new ApiError(400, "Category Id is required !!!")
        }

		// Fetch products from the database based on category ID
		const products = await Product.find({ category: category }).select("name price description brand") 


		return res.status(200).json(new ApiResponse(200, products, "Products fetched successfully !!!")) 

	} catch (error) {

        throw new ApiError(500, "Internal Server Error !!!")
	}
} 

const fetchProductById = async (req, res) => {
	try {
		const { productId } = req.params 

        if (!productId) {
            throw new ApiError(400, "Product Id is required !!!")
        }
        
		// Fetch product from the database based on product ID
		const product = await Product.findById(productId) 
        
		// Check if the product exists
		if (!product) {
            throw new ApiError(404, "Product not found !!!")
		}

		// Return the product details
		return res.status(200).json(new ApiResponse(200, product, "Product fetched successfully !!!")) 

	} catch (error) {
		// Handle errors
        throw new ApiError(500, "Internal Server Error !!!")
	}
} 

const fetchProducts = async (req, res) =>{
    try {
        
        const products = await Category.find() 

        if (!products) {
            throw new ApiError(404, "Products not found !!!")
        }

		return res.status(200).json(new ApiResponse(200, products, "Products fetched Successfully !!!")) 

    } catch (error) {
        throw new ApiError(500, "Internal Server Error !!!")
    }
}

export {fetchCategories, fetchProductsByCategory, fetchProductById, fetchProducts, createProduct, createCategory}