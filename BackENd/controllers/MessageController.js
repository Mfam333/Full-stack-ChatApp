import Cloudinary from "../lib/Cloudinary.js"
import Message from "../models/message.model.js"
import User from "../models/User.model.js"
import {getReceiverSocketId,io} from "../lib/socket.js"

export const Getuserdetail=async(req,res)=>{
    try{
    const Loginuser=req.user._id
const filterusers= await User.find({_id:{$ne:Loginuser}}).select("-password")
res.status(200).json(filterusers)
    }catch(error){
    console.log("error in the getting user",error.message)
    res.status(500).json({sucess:false,message:"server error"})


    }
}
export const Getmessages= async(req,res)=>{
    try{
const {id:userToChatId}=req.params
const myId=req.user._id
const messages= await Message.find({$or:[{senderId:myId,receiverId:userToChatId},
                                          {senderId:userToChatId,receiverId:myId}]})
res.status(200).json(messages)
    }catch(error){
    console.log("error in the getting users",error.message)
    res.status(500).json({sucess:false,message:"server error"})

    }
}

export const Sendmessage= async(req,res)=>{
    const {text,image}=req.body
    const {id:receiverId}=req.params
    const senderId=req.user._id
    try{
        let imageUrl
        if(image){
            const uploadResponse= await Cloudinary.uploader.upload(image)
            imageUrl=uploadResponse.secure_url
        }
 const newmessage=new Message({
    text,
    image:imageUrl,
    senderId,
    receiverId
 })
 await newmessage.save()
 const ReceiverSocketId=getReceiverSocketId(receiverId)
 if(ReceiverSocketId){
    io.to(ReceiverSocketId).emit("newmessage",newmessage)
 }
 res.status(201).json(newmessage)
    }catch(error){

    console.log("error in sending messages",error.message)
    res.status(500).json({sucess:false,message:"server error"})
    }
}