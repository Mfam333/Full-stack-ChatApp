import { create } from "zustand";
import { AxiosInstance} from "../lib/Axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client"
const Base_url= import.meta.env.MODE==="development"?"http://localhost:5001":"/"
export const AuthuserStore=create((set,get)=>({
    authUser:null,
    isSigningUp:false,
    iSLoginingIn:false,
    isUpdatingProfile:false,
    isCheckingAuth:true,
    OnlineUsers:[],
    socket:null,

checkAuth:async ()=>{
    try{
const res=await AxiosInstance.get("/auth/check-auth");
      console.log("res for user")
      
      set({authUser:res.data})
      get().connectSocket()
    
      
    }catch(error){
    console.log("error in check auth",error);
    set({authUser:null})
    }finally{
        set({isCheckingAuth:false})
    }
},
signupUser:async(data)=>{
    set({isSigningUp:true})
    try{
   const res=AxiosInstance.post("/auth/signup",data)
   set({authUser:res.data})
   toast.success("account created successfully")
   get().connectSocket()
   
    }catch(error){
        console.log("error in sigup",error.response.data.message);
        toast.error({error:error.response.data.message})
    }finally{
        set({isSigningUp:false})
    }
},
Logout: async()=>{
    try{
    await AxiosInstance.post("/auth/logout")
    set({authUser:false})
    toast.success("you have successfully logout")
    get().disconnectSocket()
    }catch(error){
        console.log(error)
        toast.error({error:error.response.data.message})
    }
},

Login: async(data)=>{
    try{
set({iSLoginingIn:true})
const res=await AxiosInstance.post("/auth/signin",data)
    set({authUser:res.data})
    toast.success("login successfully")
get().connectSocket()
    }catch(error){
        console.log(error)
        toast.error(error.response.data.message)
    }finally{
        set({iSLoginingIn:false})
    }
},
UpdateProfile:async(data)=>{
    set({isUpdatingProfile:true})
    try{
    AxiosInstance.put("/auth/profile-pic",data)
    
    toast.success("profile updated successfully")

    }catch(error){
        console.log("error in update profile",error)
        toast.error(error.response.data.message)
    }finally{
        set({isUpdatingProfile:false})
    }

},
  connectSocket: async()=>{
    const {authUser}=get()
    if(!authUser||get().socket?.connected) return
    const socket=io(Base_url,{
        query:{
            userId:authUser._id
        }
    })
      socket.connect()
      set({socket:socket})
      socket.on("getOnlineUsers",(userIds)=>{
        set({OnlineUsers:userIds})
      })
  },
    

  disconnectSocket: async () => {
    const { socket } = get();
    if (socket?.connected) {
      socket.disconnect();
      set({ socket: null, OnlineUsers: [] });
    }}
}))