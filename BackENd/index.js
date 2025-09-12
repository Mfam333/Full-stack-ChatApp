import express from "express"
import dotenv from "dotenv"
import AuthRouter from "./routes/Auth.routes.js"
import { dbconnection } from "./lib/mongod.js"
import cookieParser from "cookie-parser"
import MessageRouter from "./routes/Message.routes.js"
import cors from "cors"
import path from "path"
import {app,server} from "./lib/socket.js"
dotenv.config()

app.use(express.json({limit:"10mb"}))
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use("/api/auth",AuthRouter)
app.use("/api/messages",MessageRouter)

const __dirname = path.resolve();

if (process.env.NODE_ENV==="production") {
  app.use(express.static(path.join(__dirname, "/FrontEnd/dist")));

  // ✅ use "/*" instead of "*"
  app.get("/{*splat}", (req, res) => {
    res.sendFile(path.resolve(__dirname, "FrontEnd","dist","index.html"));
  });
}

    
    const Port=process.env.Port||5001


server.listen(Port,()=>{
    console.log("this app is run on port",Port)
    dbconnection()
})