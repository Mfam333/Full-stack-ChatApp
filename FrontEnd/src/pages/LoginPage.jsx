import { useState } from "react"
import { AuthuserStore } from "../store/UseAuthUser"
import { Eye, EyeOff, Loader2, Lock,MessageSquare,Mail } from "lucide-react"
import { Link } from "react-router-dom"
import ImagePatternAuth from "../components/ImagePatternAuth "

const Loginpage=()=>{
      const [isshowpassword,setIsShowpassword]=useState(false)
      const {Login,iSLoginingIn}=AuthuserStore()
    const [formdata,setFormdata]=useState({
        email:"",
        password:""
    })
    const Handlesubmit= (e)=>{
        e.preventDefault()
          console.log(formdata)
          Login(formdata)
    
    

    }

    return(
        <div className="min-h-screen grid  lg:grid-cols-2">
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
                <form onSubmit={Handlesubmit} className="space-y-6">
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
                    id="email"
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
                    id="password"
                    autoComplete="true"
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
                    <button type="submit" className="btn btn-primary w-full" disabled={iSLoginingIn}>
                        {iSLoginingIn?(<>
                        <Loader2 className="size-5 animate-spin"/>
                        loading
                        </>):("login")}

                    </button>

                </form>
                <div className="text-center">
                    <p className="text-base-content/60">
                    do not have account?{""}
                    <Link to="/signup" className="link link-primary">sign up</Link>
                    </p>
                </div>
            </div>
        </div>
        {/* right side */}
        <ImagePatternAuth
        title="join our community"
        subtitle="connect with friends,share moments and stay in touch with your loved ones"/>

    </div>
    )
}

export default Loginpage