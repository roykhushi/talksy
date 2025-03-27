import { Eye, EyeOff,Loader2, LockIcon, Mail, MessageSquare } from 'lucide-react'
import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import loginImage from "../../public/login.png";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {signIn,isLoggedIn} = useAuthStore();
  const [formData, setFormData] = useState({
    email: "",
    password:""
  });

  const validate = () => {
    if(!formData.email.trim() && !formData.password){
      toast.error("All fields are necessary!");
      return false;
    }
    if(!formData.email.trim()){
      toast.error("Email is required!");
      return false;
    }
    if(!formData.password){
      toast.error("Password is required!");
      return false;
    }

    return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validate();

    if(success){
      signIn(formData);
    }
  }

  
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-6 text-primary" />
              </div>
              <h1 className="text-2xl font-bold mt-2">Welcome Back</h1>
              <p className="text-base-content/60">
                Enter your account details
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            

            {/* email */}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className={`input input-bordered w-full pl-10`}
                  placeholder="roykhushi432@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* password */}

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered w-full pl-10`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <Eye className="size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={isLoggedIn}
            >
              {isLoggedIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Logging  In...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>
          {/* link */}
          <div className='text-center'>
            <p className='text-base-content/60'>
              Do not have an account?{" "}
              <Link to="/signup" className='link link-primary'>
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* right side */}

      <div className='w-full h-full min-h-screen object-cover overflow-hidden'>
      <img src={loginImage} alt="login-img" />
      </div>


      
    </div>
  )
}

export default LoginPage