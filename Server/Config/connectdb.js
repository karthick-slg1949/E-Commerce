import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config({

})
if(!process.env.MONGODB_URL){
    throw new Error(
        "Please Provide MONGODB_URL in the .env file"
    )
}

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("MongoDb Connected Successfully");
        
    }
    catch(error){
        console.log("Mongodb Connection error",error);
        process.exit(1)
    }
}
export default connectDB