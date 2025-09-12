import User from "../models/User.model.js"
import { generateToken } from "../lib/Util.js"
import bcrypt from "bcryptjs"
import Cloudinary from "../lib/Cloudinary.js"

export const SignUpUser=async(req,res)=>{
 const {email,fullname,password}=req.body
    try{
   
     const existinguser= await User.findOne({email})
     if(existinguser){
        return res.status(400).json({success:false,messsage:"user already exist"})
     }
     const hashedpassword=await bcrypt.hash(password,10)
     const newuser= new User({
        email,
        fullname,
        password:hashedpassword
     })
     if(newuser){
      generateToken(newuser._id,res)
     await newuser.save()
      res.status(200).json({sucess:true,message:"you have sign up",newuser:{
         name:newuser.fullname,
         email:newuser.email,
         profilepic:newuser.profilepic,
         id:newuser._id
      }})
     }else{
        return res.status(400).json({success:false,message:"user was not created"})
     }

    
    }catch(error){
       console.log("error in the signup user",error.message)
       return res.status(500).json({success:false,message:"error in the server"})
    }
    
} 

export const SigninUser=async(req,res)=>{
    const {password,email}=req.body
     try{
      const existinguser=await User.findOne({email})
      if(!existinguser){
      res.status(400).json({sucess:true,message:"invalid credentials"})

      }
      const ismatch= await bcrypt.compare(password,existinguser.password)
      if(!ismatch){
       res.status(400).json({sucess:true,message:"invalid credentials"})
      }
     
      generateToken(existinguser._id,res)
        
     res.status(200).json({sucess:true,message:"you have signin",existinguser:{
         name:existinguser.fullname,
         email:existinguser.email,
         profilepic:existinguser.profilepic,
         id:existinguser._id
      }})
    }catch(error){
        console.log("error in the signin user",error.message)
        res.status(500).json({sucess:false,message:"server error"})
    }
    
  
}

export const LogoutUser=async (req,res)=>{
     try{
      // res.clearCookie("token",{maxAge:0})
       res.cookie("token","",{maxAge:0})
     res.status(200).json({sucess:true,message:"you have logout successfully"})
    }catch(error){
        console.log("error in the logout user",error.message)
         res.status(500).json({sucess:false,message:"server error"})
    }
    
}

export const UpdateProfile= async (req,res)=>{
  
   try{
 const {profilepic}=req.body
const userId=req.user._id
if(!profilepic){
 return  res.status(400).json({sucess:false,message:"profile pic is required"})
}
const updateresponse=await Cloudinary.uploader.upload(profilepic)
const updatedprofile=await User.findByIdAndUpdate(userId,{profilepic:updateresponse.secure_url},{new:true})
res.status(200).json({success:true,messsage:"user updated",updatedprofile})
   }catch(error){
      console.log("error in the userprofile",error.message)
         res.status(500).json({sucess:false,message:"server error"})

   }

}

export const checkAuth=(req,res)=>{
   try{

      res.status(200).json(req.user)
   }catch(error){
      console.log("error in the getting user",err.message)
       res.status(500).json({sucess:false,message:"server error"})

   }
}

