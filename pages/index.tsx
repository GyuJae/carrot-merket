import type { NextPage } from "next";
import Product from "../components/Product";
import Layout from "../components/layout";
import useSWR from "swr";
import { IProductsResponse } from "./api/products";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const { data } = useSWR<IProductsResponse>("/api/products");
  const router = useRouter();
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-2 ">
        <button
          onClick={() => router.push("/product/upload")}
          className="fixed bottom-24 right-7 bg-orange-400 hover:bg-orange-500 active:bg-orange-300 transition-colors p-2 rounded-full text-white"
        >
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
        {data?.products?.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
