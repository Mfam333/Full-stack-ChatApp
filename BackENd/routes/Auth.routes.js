import express from "express"
import { LogoutUser, SigninUser, SignUpUser,UpdateProfile,checkAuth } from "../controllers/AuthControllers.js"
import { ProtectedRoute } from "../middlewares/ProtectRoute.js"
const AuthRouter=express.Router()
AuthRouter.post("/signup",SignUpUser)
AuthRouter.post("/signin",SigninUser)
AuthRouter.post("/logout",LogoutUser)
AuthRouter.put("/profile-pic",ProtectedRoute,UpdateProfile)
AuthRouter.get("/check-auth",ProtectedRoute,checkAuth)



export default AuthRouter