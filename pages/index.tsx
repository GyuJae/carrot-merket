import type { NextPage } from "next";
import Product from "../components/Product";
import Layout from "../components/layout";
import useSWR, { SWRConfig } from "swr";
import { IProductsResponse, IProductWithCount } from "./api/products";
import { useRouter } from "next/router";
import FloatingButton from "@components/FloatingButton";
import Loading from "@components/Loading";
import client from "@libs/server/client";
import { Suspense } from "react";

const ProductItem = () => {
  const { data } = useSWR<IProductsResponse>("/api/products");
  return (
    <>
      {data?.products?.map((product) => (
        <div key={product.id} className="border-b-[1.5px] last:border-b-0">
          <Product product={product} />
        </div>
      ))}
    </>
  );
};

const Home: NextPage = () => {
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
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-20">
              <Loading />
            </div>
          }
        >
          <ProductItem />
        </Suspense>
      </div>
    </Layout>
  );
};

const Page: NextPage = () => {
  return (
    <SWRConfig
      value={{
        suspense: true,
      }}
    >
      <Home />
    </SWRConfig>
  );
};

// export async function getServerSideProps() {
//   const products = await client?.product.findMany({});
//   return {
//     props: {
//       products: JSON.parse(JSON.stringify(products)),
//     },
//   };
// }

export default Page;
