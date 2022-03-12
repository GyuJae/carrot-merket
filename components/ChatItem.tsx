import { fileToUrl } from "@libs/client/utils";
import Image from "next/image";

interface IChatItem {
  chatName: string;
  recentPayload: string;
  avatar: string | null;
}

const ChatItem: React.FC<IChatItem> = ({ chatName, recentPayload, avatar }) => {
  return (
    <div className="flex px-4 cursor-pointer py-3 items-center space-x-3">
      <div className="w-12 h-12 rounded-full bg-slate-300 relative">
        {avatar && (
          <Image
            src={fileToUrl({ fileId: avatar, variant: "avatar" })}
            layout="fill"
            alt="avatar"
            className="rounded-full"
          />
        )}
      </div>
      <div>
        <p className="text-gray-700">{chatName}</p>
        <p className="text-sm  text-gray-500">{recentPayload}</p>
      </div>
    </div>
  );
};

export default ChatItem;
