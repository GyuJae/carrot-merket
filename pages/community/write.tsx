import type { NextPage } from "next";
import Layout from "../../components/layout";
import SubmitButton from "../../components/submit-button";
import Textarea from "../../components/Textarea";

const Write: NextPage = () => {
  return (
    <Layout title="Community Write" canGoBack>
      <div className="flex flex-col px-4 py-6">
        <form className="flex flex-col">
          <Textarea
            label={"community"}
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
