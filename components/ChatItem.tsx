interface IChatItem {
  chatName: string;
  recentPayload: string;
}

const ChatItem: React.FC<IChatItem> = ({ chatName, recentPayload }) => {
  return (
    <div className="flex px-4 cursor-pointer py-3 items-center space-x-3">
      <div className="w-12 h-12 rounded-full bg-slate-300" />
      <div>
        <p className="text-gray-700">{chatName}</p>
        <p className="text-sm  text-gray-500">{recentPayload}</p>
      </div>
    </div>
  );
};

export default ChatItem;
