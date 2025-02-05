import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

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

    },


}));