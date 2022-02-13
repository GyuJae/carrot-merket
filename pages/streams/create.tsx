import type { NextPage } from "next";
import SubmitButton from "../../components/submit-button";

const Create: NextPage = () => {
  return (
    <div className="py-16 px-4">
      <form className="flex flex-col space-y-2">
        <label htmlFor="title" className="py-1 text-sm font-semibold">
          Title
        </label>
        <input
          id="title"
          placeholder="Title"
          type="text"
          className="appearance-none mt-2 border-gray-400 focus:border-orange-400 focus:ring-orange-400 rounded-md "
        />

        <label htmlFor="price" className="py-1 text-sm font-semibold">
          Price
        </label>
        <input
          id="price"
          placeholder="$ Price"
          type="number"
          className="appearance-none mt-2 border-gray-400 focus:border-orange-400 focus:ring-orange-400 rounded-md "
        />
        <label htmlFor="description" className="py-1 text-sm font-semibold">
          Description
        </label>
        <textarea
          id="description"
          placeholder="Description"
          className="appearance-none mt-2 h-48 border-gray-400 focus:border-orange-400 focus:ring-orange-400 rounded-md "
        />
        <SubmitButton payload="Upload Product" />
      </form>
    </div>
  );
};

export default Create;
