import type { NextPage } from "next";
import Layout from "../components/layout";

const Home: NextPage = () => {
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-2 ">
        <button className="fixed bottom-24 right-3 bg-orange-400 hover:bg-orange-500 active:bg-orange-300 transition-colors p-2 rounded-full text-white">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map(
          (i) => (
            <div key={i} className="flex justify-between border-b-[1.5px] ">
              <div className="flex w-full justify-between cursor-pointer">
                <div className="flex  py-2 px-1 space-x-3">
                  <div className="w-20 h-20 bg-slate-500 rounded-md"></div>
                  <div className="flex flex-col py-1">
                    <div className="text-sm font-semibold">title</div>
                    <div className="text-xs text-gray-400">location</div>
                    <div className="text-sm font-bold">price</div>
                  </div>
                </div>
                <div className=" flex items-end space-x-2 px-2 py-2">
                  <div className="flex justify-center items-center text-gray-500 text-sm space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      ></path>
                    </svg>
                    <span>1</span>
                  </div>
                  <div className="flex justify-center items-center text-gray-500 text-sm space-x-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      ></path>
                    </svg>
                    <span>1</span>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Layout>
  );
};

export default Home;
