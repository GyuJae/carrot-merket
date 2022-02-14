import type { NextPage } from "next";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import SubmitButton from "../../components/submit-button";
import Textarea from "../../components/Textarea";

const Create: NextPage = () => {
  return (
    <Layout title="Live Stream Start" canGoBack>
      <div className="py-4 px-4">
        <form className="flex flex-col space-y-2">
          <Input
            placeholder="Title"
            name="title"
            type="text"
            id="title"
            label="Title"
          />
          <Input
            placeholder="$ Price"
            name="price"
            type="number"
            id="price"
            label="price"
          />
          <Textarea
            placeholder="Description"
            name="description"
            type="text"
            id="description"
            label="description"
            rows={7}
          />

          <SubmitButton payload="Upload Product" />
        </form>
      </div>
    </Layout>
  );
};

export default Create;
