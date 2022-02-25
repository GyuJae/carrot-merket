import ProductList from "@components/ProductList";
import type { NextPage } from "next";
import Layout from "../../components/layout";

const Loved: NextPage = () => {
  return (
    <Layout title="Loved" canGoBack>
      <ProductList kind="favs" />
    </Layout>
  );
};

export default Loved;
