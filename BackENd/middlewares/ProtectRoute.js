import jwt from "jsonwebtoken"
import User from "../models/User.model.js"
export const ProtectedRoute= async (req,res,next)=>{

    try{
     const token=req.cookies.token
     if(!token){
        return res.status(401).json({success:false,message:"unauthorizedtoken not provided-"})
     }
     const decoded=jwt.verify(token,process.env.JWT_SECRET)
     if(!decoded){
        return res.status(401).json({success:false,message:"unauthorized-token is invalid"})
     }
     const user= await User.findById(decoded.userId).select("-password")
     req.user=user
     next()
    }catch(error){
         console.log("error in middleware",error.message)
         res.status(500).json({sucess:false,message:"server error"})

    }

}