import type { NextPage } from "next";
import Product from "../components/Product";
import Layout from "../components/layout";
import useSWR from "swr";
import { IProductsResponse } from "./api/products";
import { useRouter } from "next/router";
import FloatingButton from "@components/FloatingButton";

const Home: NextPage = () => {
  const { data } = useSWR<IProductsResponse>("/api/products");
  const router = useRouter();
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-2 ">
        <FloatingButton onClick={() => router.push("/product/upload")}>
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
        </FloatingButton>
        {data?.products?.map((product) => (
          <div key={product.id} className="border-b-[1.5px] last:border-b-0">
            <Product product={product} />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
