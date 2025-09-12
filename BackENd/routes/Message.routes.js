import express from "express"
import { ProtectedRoute } from "../middlewares/ProtectRoute.js"
import { Getuserdetail,Getmessages ,Sendmessage} from "../controllers/MessageController.js"
const MessageRouter=express.Router()

MessageRouter.get("/users",ProtectedRoute,Getuserdetail)
MessageRouter.get("/:id",ProtectedRoute,Getmessages)
MessageRouter.post("/send/:id",ProtectedRoute,Sendmessage)



export default MessageRouter