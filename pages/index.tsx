import useUser from "@libs/client/hooks/useUser";
import type { NextPage } from "next";
import Item from "../components/Item";
import Layout from "../components/layout";

const Home: NextPage = () => {
  const user = useUser();
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
            <Item key={i} />
          )
        )}
      </div>
    </Layout>
  );
};

export default Home;
