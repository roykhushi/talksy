import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessages, isMesssagesLoading, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [selectedUser._id, getMessages]);

  if (isMesssagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />

        <MessageSkeleton />

        <MessageInput />
      </div>
    );
  }
  return (
    <div>
      
    </div>
  );
};

export default ChatContainer;
