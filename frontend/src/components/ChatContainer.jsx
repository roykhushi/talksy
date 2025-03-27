import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatTime } from "../lib/utils";
import defaultAvatar from "../../public/avatar1.png";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMesssagesLoading,
    selectedUser,
    receiveMessages,
    unreceiveMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    receiveMessages();

    //when cleaning up
    return () => unreceiveMessages();
  }, [selectedUser._id, getMessages, unreceiveMessages, receiveMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]); //auto scroll whenever the messages are received

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
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length > 0 ? (
          messages.map((msg) => (
            <div
              key={msg._id}
              className={`chat ${
                msg.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
              ref={messageEndRef}
            >
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={
                      msg.senderId === authUser._id
                        ? authUser.profilePic
                        : selectedUser.profilePic || defaultAvatar
                    }
                    alt="profile pic"
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">
                  {formatTime(msg.createdAt)}
                </time>
              </div>
              <div className="chat-bubble flex flex-col">
                {msg.image && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="sm:max-w-[200px] rounded-md mb-2"
                  />
                )}
                {msg.text && <p>{msg.text}</p>}
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="flex items-center justify-center">
              <h2 className="text-2xl font-bold pt-20">It feels empty! ☹️</h2>
            </div>
            <div className="flex justify-center items-center">
              <p className="text-base-content/60 pt-2">
              Start your conversation today with Talksy!✨
              </p>
            </div>
          </>
        )}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
