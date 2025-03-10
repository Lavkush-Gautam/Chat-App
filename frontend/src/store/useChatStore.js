import { create } from "zustand";
import toast from "react-hot-toast";
import { Users } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isUsersLoading: true });
        try {
            const response = await axiosInstance.get('message/users');

            set({ users: response.data });
        } catch (error) {
            toast.error(error.response.data.messages);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessage: async (userId) => {

        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    sendMessage: async (messageData) => {
        const { messages, selectedUser } = get()
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData)
            set({ messages: [...messages, res.data] })
        } catch (error) {
            toast.error(error.response.data.message)

        }

    },

    subscribeToMessage: () => {
        const { selectedUser } = get()
        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket;


        socket.on('newMessage', (newMessage) => {
            if (newMessage.senderId !== selectedUser._id) return;
            set({ messages: [...get().messages, newMessage] })
        })
    },

    unsubscribeFromMessage: () => {
        const socket = useAuthStore.getState().socket;
        socket.off('newMessage');
    },

    setSelectedUser: (selectedUser) => set({ selectedUser })
}));