import {create} from "zustand";
import toast from "react-hot-toast";
import {axiosInstance} from "../lib/axios";

export const useChatStore = create((set) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMesssagesLoading: false,

    getUsers : async () => {
        set({isUsersLoading: true});
        try {
            const res = await axiosInstance.get("/messages/users");
            set({users: res.data});
        } catch (error) {
            toast.error("Error in fetching users!");
        }
        finally{
            set({isUsersLoading: false});
        }
    },

    getMessages : async(userId) =>{
        set({isMesssagesLoading: true});
        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            set({messages: res.data});
        } catch (error) {
            toast.error("Error in fetching messages!");
        }
        finally{
            set({isMesssagesLoading: false});
        }
    },

    setSelectedUser: (selectedUser) => set({selectedUser})
}))