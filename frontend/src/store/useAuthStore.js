import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import axios from "axios";

export const useAuthStore = create((set) => ({
    //checking if the user is authenticated or not for eg upon refreshing
    authUser : null,
    //loading states
    isSigningUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async() =>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
        } catch (error) {
            console.log(`error in zustand store for checking auth ${error.message}`);
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth: false});
        }
    },

    signUp: async(data) =>{
        set({isSigningUp : true});
        try {
            const res = await axiosInstance.post("/auth/signup", data); //sending the data from user back to backend
            set({authUser : res.data}); 
            toast.success("Account Created Successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
        finally{
            set({isSigningUp: false});
        }
    },

    logout : async() =>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null});
            toast.success("Logged out Successfully!");
        } catch (error) {
            toast.error("Some error occurred while logging out!");
        }
        
    },

    signIn : async(data) => {
        set({isLoggedIn: true});
        try {
            const res = await axiosInstance.post("/auth/login",data);
            set({authUser: res.data});
            toast.success("Logged in successfully!");
        } catch (error) {
            toast.error("Invalid Credentials!");
        }
        finally{
            set({isLoggedIn: false});
        }
    }


}));