import ProductList from "@components/ProductList";
import type { NextPage } from "next";
import Layout from "../../components/layout";

const Bought: NextPage = () => {
  return (
    <Layout title="Bought" canGoBack>
      <ProductList kind="purchases" />
    </Layout>
  );
};

export default Bought;
