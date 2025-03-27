import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MessageSquare,
  User,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import signUpImage from "../../public/sign-up.png";



const SignUpPage = () => {
  const { signUp, isSigningUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const validateForm = () => {
    if(!formData.fullName.trim() && !formData.email.trim() && !formData.password){
      toast.error("All fields are necessary!");
      return false;
    }
    if(!formData.fullName.trim()){
      toast.error("Name is required!");
      return false;
    }
    if(!formData.email.trim()){
      toast.error("Email is required!");
      return false;
    }
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // if(emailRegex.test(formData.email)){
    //   toast.error("Invalid Email Format!");
    //   return false;
    // }
    if(!formData.password){
      toast.error("Password is required!");
      return false;
    }
    if(formData.password.length < 6){
      toast.error("Password must be atleast 6 characters!");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if(!success){
      return;
    }

    if(success){
      signUp(formData);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* left side - image */}
      <div className='hidden lg:block w-full h-full min-h-screen object-cover overflow-hidden'>
        <img 
          src={signUpImage} 
          alt="login-img" 
          className="w-full h-full object-cover"
        />
      </div>
  
      {/* right side - form */}
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 lg:p-12">
        <div className="w-full max-w-md space-y-6 lg:space-y-8">
          {/* logo and header */}
          <div className="text-center mb-6 lg:mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className="size-10 sm:size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <MessageSquare className="size-5 sm:size-6 text-primary" />
              </div>
              <h1 className="text-xl sm:text-2xl font-bold mt-2">Create Account</h1>
              <p className="text-sm sm:text-base text-base-content/60">
                Get started with your free account
              </p>
            </div>
          </div>
  
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="size-4 sm:size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered w-full pl-10 text-sm sm:text-base"
                  placeholder="Khushi Roy"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
  
            {/* Email field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-4 sm:size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered w-full pl-10 text-sm sm:text-base"
                  placeholder="roykhushi432@gmail.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>
  
            {/* Password field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="size-4 sm:size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-10 text-sm sm:text-base"
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
                    <Eye className="size-4 sm:size-5 text-base-content/40" />
                  ) : (
                    <EyeOff className="size-4 sm:size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>
  
            <button
              type="submit"
              className="btn btn-primary w-full mt-6"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-4 sm:size-5 animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
  
          {/* Sign in link */}
          <div className="text-center mt-4">
            <p className="text-sm sm:text-base text-base-content/60">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
