import type { NextPage } from "next";

const Write: NextPage = () => {
  return (
    <div className="flex flex-col px-4 py-10">
      <form className="flex flex-col">
        <textarea
          className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
          rows={4}
          placeholder="Ask a question!"
        />
        <button className="focus:outline-none mt-5 bg-orange-400 w-full text-white rounded-sm py-1 ring-2 ring-offset-1 ring-orange-400 hover:bg-orange-500 active:bg-orange-300">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Write;
