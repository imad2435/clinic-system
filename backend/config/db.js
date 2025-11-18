import mongoose from "mongoose";
export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true 
        });;
           console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.log("Error in MongoDB Connection",error)
        process.exit(1);
    }
}