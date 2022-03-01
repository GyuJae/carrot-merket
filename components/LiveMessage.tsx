import { classToString } from "@libs/client/utils";
import { Message } from "@prisma/client";
import { MessageWithUserName } from "pages/api/streams/[id]";
import React from "react";

interface ILiveMessage extends MessageWithUserName {
  isMe: boolean;
}

const LiveMessage: React.FC<ILiveMessage> = ({
  isMe,
  message,
  user: { name, avatar },
}) => {
  return (
    <div className="flex items-center ">
      <div className="bg-gray-500 w-7 h-7 rounded-full" />
      <div className="ml-1">
        <span
          className={classToString(
            "text-xs ml-2 font-semibold",
            isMe ? "text-orange-500" : "text-gray-400"
          )}
        >
          {name}
        </span>
        <span className="text-xs font-light ml-2">{message}</span>
      </div>
    </div>
  );
};

export default LiveMessage;
