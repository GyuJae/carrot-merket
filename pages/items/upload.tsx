import type { NextPage } from "next";

const upload: NextPage = () => {
  return (
    <div className="py-16 px-4">
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
          <button className="focus:outline-none mt-5 bg-orange-400 w-full text-white rounded-sm py-1 ring-2 ring-offset-1 ring-orange-400 hover:bg-orange-500 active:bg-orange-300">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default upload;
