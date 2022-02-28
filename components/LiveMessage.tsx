import { Message } from "@prisma/client";
import React from "react";

interface ILiveMessage {
  message: Message;
  isMe: boolean;
}

const LiveMessage: React.FC<ILiveMessage> = ({ isMe, message }) => {
  return (
    <div className="flex items-center ">
      <div className="bg-gray-500 w-7 h-7 rounded-full" />
      <div className="ml-1">
        <span className="text-xs font-light ml-2">{message}</span>
      </div>
    </div>
  );
};

export default LiveMessage;
