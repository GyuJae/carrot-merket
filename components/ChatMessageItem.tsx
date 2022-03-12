import { fileToUrl } from "@libs/client/utils";
import Image from "next/image";

interface IChatMessageItem {
  me: boolean;
  payload: string;
  name: string;
  avatar?: string;
}

const ChatMessageItem: React.FC<IChatMessageItem> = ({
  me,
  payload,
  name,
  avatar,
}) => {
  return (
    <>
      {me ? (
        <div className="flex items-center flex-row-reverse mb-4">
          <div className="w-12 h-12 rounded-full relative bg-slate-300">
            {avatar && (
              <Image
                src={fileToUrl({ fileId: avatar, variant: "avatar" })}
                layout="fill"
                alt="avatar"
                className="absolute rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col justify-center mr-2">
            <div className="text-sm font-semibold text-left flex justify-end">
              {name}
            </div>
            <div className="flex bg-gray-500 text-sm text-white p-1 rounded-md">
              {payload}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 relative rounded-full bg-slate-300">
            {avatar && (
              <Image
                src={fileToUrl({ fileId: avatar, variant: "avatar" })}
                layout="fill"
                alt="avatar"
                className="absolute rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col justify-center ml-2">
            <div className="text-sm font-semibold">{name}</div>
            <div className="flex  bg-gray-500 text-sm w-3/4 text-white p-1 rounded-md">
              {payload}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatMessageItem;
