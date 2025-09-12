import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";


export const dbconnection=async()=>{
    try{
  await  mongoose.connect(process.env.MONGODB_URL)
  console.log("mongodb connected")

}catch(error){
    console.log("error in connecting to mongodb",error)
}

}
