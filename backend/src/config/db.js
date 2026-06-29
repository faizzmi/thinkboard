import mongoose from "mongoose"

export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MONGODB CONNECTED SUCCESFULLY!")

    } catch (error){
        console.log("fail to connect:", error);
        process.exit()
    }
}