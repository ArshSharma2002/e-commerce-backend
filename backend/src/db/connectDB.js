import mongoose from 'mongoose'

export async function connectDB() {
    try {
        const connectRes = await mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`);
        console.log("Host connect to DB : " + connectRes.connection.host);

    } catch (error) {
        console.log(error);
    }
}