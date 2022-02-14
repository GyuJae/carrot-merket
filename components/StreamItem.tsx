interface IStreamItem {
  title: string;
  thumbnail: string;
}

const StreamItem: React.FC<IStreamItem> = ({ title, thumbnail }) => {
  return (
    <div className="py-4 cursor-pointer">
      <div className="w-full h-48 bg-gray-400 rounded-md" />
      <div className="mt-2 px-2 hover:underline">{title}</div>
    </div>
  );
};

export default StreamItem;
