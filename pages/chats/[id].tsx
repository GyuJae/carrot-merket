import { NextPage } from "next";
import Layout from "../../components/layout";

const ChatDetail: NextPage = () => {
  return (
    <Layout title="Chat Detail" canGoBack>
      <div className="flex flex-col pt-3 pb-20 px-2">
        {/* other chat */}
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 rounded-full bg-slate-300" />
          <div className="flex flex-col justify-center ml-2">
            <div className="text-sm font-semibold">name</div>
            <div className="flex bg-gray-500 text-sm w-3/4 text-white p-1 rounded-md">
              Hi how much are you selling them
            </div>
          </div>
        </div>
        {/* My Chat */}
        <div className="flex items-center flex-row-reverse">
          <div className="w-12 h-12 rounded-full bg-slate-300" />
          <div className="flex flex-col justify-center mr-2">
            <div className="text-sm font-semibold text-left flex justify-end">
              name
            </div>
            <div className="flex bg-gray-500 text-sm text-white p-1 rounded-md">
              I want ￦20,000
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 px-3 py-2 shadow-sm w-full max-w-xl">
          <div className="flex w-full">
            <input
              type="text"
              className="w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
            />
            <div className="p-2 bg-orange-400 text-white font-semibold rounded-r-md ml-1 cursor-pointer">
              <span>&rarr;</span>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
