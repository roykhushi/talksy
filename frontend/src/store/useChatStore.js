import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMesssagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      console.log(error);
      toast.error("Error in fetching users!");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMesssagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Error in fetching messages!");
    } finally {
      set({ isMesssagesLoading: false });
    }
  },

  sentMessage: async (data) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        data
      );
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error("Cannot send messages at the moment!");
    }
  },

  receiveMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) {
      return;
    }

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMsg) => {
      if (newMsg.senderId !== selectedUser._id) {
        return;
      }
      set({ messages: [...get().messages, newMsg] });
    });
  },

  unreceiveMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
