import type { NextPage } from "next";
import Layout from "../../components/layout";
import SubmitButton from "../../components/submit-button";

const Write: NextPage = () => {
  return (
    <Layout title="Community Write" canGoBack>
      <div className="flex flex-col px-4 py-6">
        <form className="flex flex-col">
          <textarea
            className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
            rows={4}
            placeholder="Ask a question!"
          />
          <SubmitButton payload="Submit" />
        </form>
      </div>
    </Layout>
  );
};

export default Write;
