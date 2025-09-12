import Navbar from "./components/Navbar"
import Homepage from "./pages/Homepage"
import { Routes,Route } from "react-router-dom"
import SignupPage from "./pages/SignupPage"
import Loginpage from "./pages/LoginPage"
import Settingpage from "./pages/Settingpage"
import Profilepage from "./pages/ProfilePage"
import { AuthuserStore } from "./store/UseAuthUser"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import {Toaster } from "react-hot-toast"
import { Navigate } from "react-router-dom"
import { useThemes } from "./store/useThemeStore"




function App() {
  const {authUser,checkAuth,isCheckingAuth,OnlineUsers}=AuthuserStore()
  console.log("online users here",OnlineUsers)
  const {theme}=useThemes()
  useEffect(()=>{
    checkAuth()

  },[])
  console.log("this is theme",theme)

  if(isCheckingAuth&&!authUser)
    return(<div className="flex items-center justify-center h-screen">
          <Loader className="size-10 animate-spin"/>
    </div>)


  return (
    <div className="bg-blend-darken" data-theme={theme}> 
      <Navbar/>
      <Routes>
        <Route path="/" element={authUser?<Homepage/>:<Navigate to="/login"/>}/>
        <Route path="/signup" element={!authUser?<SignupPage/>:<Navigate to="/"/>}/>
        <Route path="/login" element={!authUser?<Loginpage/>:<Navigate to="/"/>}/>
        <Route path="/setting" element={<Settingpage/>}/>
        <Route path="/profile" element={authUser?<Profilepage/>:<Navigate to="/login"/>}/>
      </Routes>
       <Toaster/>
    </div>
  )
  
}

export default App
