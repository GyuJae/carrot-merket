import type { NextPage } from "next";

const Edit: NextPage = () => {
  return (
    <div className="py-16 px-4">
      <div className="flex items-center">
        <div className="w-16 h-16 bg-gray-500 rounded-full" />
        <label
          htmlFor="avatar"
          className="ml-2 border-gray-300 border-2 p-1 rounded-md text-gray-600 cursor-pointer hover:text-orange-500 hover:border-orange-500 text-sm font-medium active:border-orange-200 active:text-orange-100"
        >
          Change Photo
        </label>
        <input id="avatar" type="file" accept="image/*" className="hidden" />
      </div>
      <div className="flex flex-col py-2">
        <label className="py-2 text-sm font-semibold">Email Address</label>
        <input
          type="email"
          placeholder="Enter your Email"
          required
          className="appearance-none outline-none px-3 py-3 rounded-sm shadow-sm border-gray-300 placeholder-gray-300 focus:border-orange-400 ring-1 focus:ring-orange-400   "
        />
      </div>
      <div className="flex flex-col py-2">
        <label className="py-2 text-sm font-semibold">Phone Number</label>
        <div className="flex">
          <div className="flex justify-center items-center bg-gray-200 text-gray-400 px-2 rounded-l-lg">
            +82
          </div>
          <input
            type="number"
            placeholder="Enter your Phone Number"
            required
            className="appearance-none outline-none w-full px-3 py-3 rounded-sm shadow-sm border-gray-300 placeholder-gray-300 focus:border-orange-400 ring-1 focus:ring-orange-400   "
          />
        </div>
      </div>
      <button
        type="submit"
        className=" w-full focus:outline-none hover:bg-orange-500 active:bg-orange-300 ring-2 ring-offset-2 ring-orange-400 bg-orange-400 mt-4 rounded-sm text-white font-semibold py-2"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Edit;
