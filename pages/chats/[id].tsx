import { NextPage } from "next";
import ChatMessageItem from "../../components/ChatMessageItem";
import Layout from "../../components/layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout title="Chat Detail" canGoBack>
      <div className="flex flex-col pt-3 pb-20 px-2">
        {/* other chat */}
        <ChatMessageItem
          me={false}
          name={"규태"}
          payload={"깔깔깔 asdeasd 뭐야 뭐야ㅐ"}
        />

        {/* My Chat */}
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />
        <ChatMessageItem me={true} name={"정규재"} payload={"hello hello"} />

        <div className="fixed bottom-0 px-3 py-2 shadow-sm w-full max-w-xl">
          <div className="flex w-full">
            <input
              type="text"
              className="w-full focus:ring-orange-500 rounded-l-md border-gray-300 focus:border-orange-500 focus:border-l-0"
            />
            <div className="p-2 bg-orange-400 ml-1 text-white font-semibold rounded-r-md cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
