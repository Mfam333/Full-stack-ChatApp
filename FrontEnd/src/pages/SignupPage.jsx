import { useState } from "react"
import { AuthuserStore } from "../store/UseAuthUser"
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react"
import { Link } from "react-router-dom"
import ImagePatternAuth from "../components/ImagePatternAuth "
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const SignupPage=()=>{
    const [isshowpassword,setIsShowpassword]=useState(false)
    const [formdata,setFormdata]=useState({
        fullname:"",
        email:"",
        password:""
    })
    const navigate=useNavigate()

    const {signupUser,isSigningUp}=AuthuserStore()

    const inputValidation=()=>{
      if(!formdata.fullname.trim()) return toast.error("fullname is required")
        if(!formdata.email.trim()) return toast.error("email is required")
        if(!formdata.password.trim()) return toast.error("password is required")
        if(formdata.password.length<6)return toast.error("password is must be longer than 6 characters")
        
            return true
    }
    
    

    const HandleSubmit= (e)=>{
        e.preventDefault()

         const success=inputValidation()
        if(success===true) signupUser(formdata)
       navigate("/")
        

    }
    return(<div className="min-h-screen grid  lg:grid-cols-2">
        {/* left side of the div */}
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center mb-8">
                    <div className="flex flex-col items-center gap-2 group">
                        <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20
                        transition-colors">
                        <MessageSquare className="size-6 text-primary"/>
                        </div>
                        <h1 className="text-2xl font-bold mt-2">create</h1>
                        <p className="text-base-content/20">get started with your free account</p>
                    </div>
                </div>
                <form onSubmit={HandleSubmit} className="space-y-6">
                    <div className="form-control">

                    <label className="label">
                   <span className="label-text font-medium">fullname</span>
                    </label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="size-5 text-base-content/40"/>
                    </div>
                    <input className={"input input-bordered w-full pl-10"}
                    placeholder="mfam"
                    value={formdata.fullname}
                    onChange={(e)=>setFormdata({...formdata,fullname:e.target.value})}
                   type="text" />
                    </div>
                    </div>

                    <div className="form-control">

                    <label className="label">
                   <span className="label-text font-medium">email</span>
                    </label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="size-5 text-base-content/40"/>
                    </div>
                    <input className={"input input-bordered w-full pl-10"}
                    placeholder="email@gmail.com"
                    text="email"
                    value={formdata.email}
                    onChange={(e)=>setFormdata({...formdata,email:e.target.value})}
                    />

                    </div>

                    </div>
                    <div className="form-control">

                    <label className="label">
                   <span className="label-text font-medium">password</span>
                    </label>
                    <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="size-5 text-base-content/40"/>
                    </div>
                    <input 
                    
                    type={isshowpassword?"text":"password"}
                    className={"input input-bordered w-full pl-10"}
                    placeholder="...."
                    value={formdata.password}
                    onChange={(e)=>setFormdata({...formdata,password:e.target.value})}
                    />
                    <button type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={()=>setIsShowpassword(!isshowpassword)}
                    >
                    {isshowpassword?(<EyeOff className="size-5 text-base-content/40"/>):(<Eye className="size-5 text-base-content/40"/>)}
                    </button>

                    </div>

                    </div>
                    <button type="submit" className="btn btn-primary w-full" disabled={isSigningUp}>
                        {isSigningUp?(<>
                        <Loader2 className="size-5 animate-spin"/>
                        loading
                        </>):("create account")}

                    </button>

                </form>
                <div className="text-center">
                    <p className="text-base-content/60">
                    Already have an account?{""}
                    <Link to="/login" className="link link-primary">sign in</Link>
                    </p>
                </div>
            </div>
        </div>
        {/* right side */}
        <ImagePatternAuth
        title="join our community"
        subtitle="connect with friends,share moments and stay in touch with your loved ones"/>

    </div>)
}

export default SignupPage