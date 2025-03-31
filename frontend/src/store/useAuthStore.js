import {create} from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:8080" : "/api";

export const useAuthStore = create((set,get) => ({
    //checking if the user is authenticated or not for eg upon refreshing
    authUser : null,
    //loading states
    isSigningUp: false,
    isLoggedIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,
    onlineUsers : [],
    socket: null,

    checkAuth: async() =>{
        try {
            const res = await axiosInstance.get("/auth/check");
            set({authUser: res.data});
            get().connectSocket();
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
            get().connectSocket();
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
            get().disconnectSocket();
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

            get().connectSocket(); //connecting to the socket io server as soon as we login
        } catch (error) {
            toast.error("Invalid Credentials!");
        }
        finally{
            set({isLoggedIn: false});
        }
    },

    updatingProfile : async(data) =>{
        set({isUpdatingProfile : true});
        try {
            const res = await axiosInstance.put("/auth/update-profile",data);
            set({authUser : res.data});
            toast.success("Profile image updated successfully!");
        } catch (error) {
            console.log(`error in update profile ${error}`);
            toast.error(error.response.data.message || "An error occurred while updating the profile.");
        }
        finally{
            set({isUpdatingProfile : false});
        }
    },

    connectSocket : () => {
        const {authUser} = get();
        if(!authUser || get().socket?.connected){
            return;
        }
        const socket = io(BASE_URL, {
            query: {
                userId: authUser._id, //id of user getting from mongodb
            }
        });
        socket.connect();

        set({socket: socket});

        socket.on("getOnlineUsers", (userIds) => {
            set({onlineUsers: userIds})
        })

    },
    disconnectSocket : () => {
        if(get().socket?.connected){
            get().socket.disconnect();
        }
    }

}));