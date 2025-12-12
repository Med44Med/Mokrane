import React from "react";
import ChatMessage from './ChatMessage';

const ChatMessages = ({messages,sender}) => {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((m, index) => (
        <ChatMessage key={index} message={m} sender={sender} />
      ))}
    </div>
  );
};

export default ChatMessages;
