import type { NextPage } from "next";
import { useState } from "react";
import { classToString } from "../libs/utils";

const Enter: NextPage = () => {
  const [method, setMethod] = useState<"email" | "phone">("email");
  const setEmail = () => setMethod("email");
  const setPhone = () => setMethod("phone");

  return (
    <div className="flex flex-col items-center">
      <div className="flex justify-center items-center py-10">
        <h3 className="font-semibold text-2xl">Enter to Carrot</h3>
      </div>
      <div className="flex justify-around w-full">
        <div
          onClick={setEmail}
          className={classToString(
            "border-b-2 w-full py-2 flex justify-center items-center cursor-pointer",
            method === "email"
              ? "text-orange-400 font-semibold border-orange-400"
              : "text-black"
          )}
        >
          Email Address
        </div>
        <div
          onClick={setPhone}
          className={classToString(
            "border-b-2 w-full py-2 flex justify-center items-center cursor-pointer",
            method === "phone"
              ? "text-orange-400 font-semibold border-orange-400"
              : "text-black"
          )}
        >
          Phone Number
        </div>
      </div>
      <div className="flex flex-col w-full px-3 mb-5">
        <div className="w-full py-5">
          <form className="flex flex-col">
            {method === "email" && (
              <>
                <label className="py-2 text-sm font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  required
                  className="appearance-none outline-none px-3 py-3 rounded-sm shadow-sm border-gray-300 placeholder-gray-300 focus:border-orange-400 ring-1 focus:ring-orange-400   "
                />
              </>
            )}
            {method === "phone" && (
              <>
                <label className="py-2 text-sm font-semibold">
                  Phone Number
                </label>
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
              </>
            )}
            <button
              type="submit"
              className=" focus:outline-none hover:bg-orange-500 active:bg-orange-300 ring-2 ring-offset-2 ring-orange-400 bg-orange-400 mt-4 rounded-sm text-white font-semibold py-2"
            >
              {method === "email" && "Get Email Link"}
              {method === "phone" && "Get One-time Password"}
            </button>
          </form>
        </div>
      </div>
      <div className="flex relative w-full justify-center font-semibold px-2 mb-5">
        <div className=" bg-white z-10 text-gray-400 px-2">Or Enter With</div>
        <div className="absolute top-3 h-[1.2px] bg-gray-300 w-full"></div>
      </div>
      <div className="flex w-full justify-between px-2 gap-2">
        <button className="bg-gray-200 w-full flex justify-center items-center py-3 border-2 border-gray-300 rounded-md text-gray-500">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </button>
        <button className="bg-gray-200 w-full flex justify-center items-center py-3 border-2 border-gray-300 rounded-md text-gray-500">
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Enter;
