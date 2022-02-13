import type { NextPage } from "next";
import Input from "../../components/Input";
import Layout from "../../components/layout";
import SubmitButton from "../../components/submit-button";
import Textarea from "../../components/Textarea";

const upload: NextPage = () => {
  return (
    <Layout title="Upload Product" canGoBack>
      <div className="py-4 px-4">
        <div>
          <label className="w-full h-48 cursor-pointer text-gray-400 hover:text-orange-400 hover:border-orange-400 rounded-md flex justify-center items-center border-dashed border-2">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input type="file" className="hidden" />
          </label>
        </div>
        <div>
          <form className="flex flex-col space-y-2">
            <Input type="text" label="title" placeholder="Title" name="Title" />
            <Input
              type="number"
              label="price"
              placeholder="$ Price"
              name="price"
            />

            <Textarea
              label="description"
              rows={5}
              required
              placeholder="Description"
            />

            <SubmitButton payload="Upload Product" />
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default upload;
