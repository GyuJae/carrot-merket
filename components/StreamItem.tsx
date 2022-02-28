import { Stream } from "@prisma/client";

interface IStreamItem {
  stream: Stream;
  [key: string]: any;
}

const StreamItem: React.FC<IStreamItem> = ({ stream, ...rest }) => {
  return (
    <div {...rest} className="py-4 cursor-pointer">
      <div className="w-full h-48 bg-gray-400 rounded-md" />
      <div className="mt-2 px-2 hover:underline">{stream.name}</div>
    </div>
  );
};

export default StreamItem;
