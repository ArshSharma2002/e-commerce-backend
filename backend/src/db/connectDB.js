import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        console.log(`${process.env.DB_URI}/ecommerce`)
        const connectionRes = await mongoose.connect(`${process.env.DB_URI}/ecommerce`)
        console.log(`connncted to HOST: ${connectionRes.connection.host}`);
        
    } catch (error) {
        console.error("MongoDB connection ERROR: ", error);
        process.exit(1) // to exit the process.
    }
}

export default connectDB