import ProductList from "@components/ProductList";
import type { NextPage } from "next";
import Layout from "../../components/layout";

const Sold: NextPage = () => {
  return (
    <Layout title="Sold" canGoBack>
      <ProductList kind="sales" />
    </Layout>
  );
};

export default Sold;
