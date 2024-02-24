import dotenv from 'dotenv'
import { connectDB } from './db/connectDB.js'
import app from './app.js'

dotenv.config()

connectDB()
.then(()=>{
    app.on("error",()=>{
            console.log("ERROR: ", error);
            throw error
        })
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`listening at port: ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MongoDB connection failed !!!");
})

