import type { NextPage } from "next";
import React from "react";
import Layout from "../../components/layout";

const ItemDetail: NextPage = () => {
  return (
    <Layout title="Detail" canGoBack>
      <div className="flex flex-col items-center pb-16 py-3">
        <div className="w-full h-72 bg-slate-400" />
        <div className="flex flex-col px-2 w-full">
          <div className="flex py-2 border-b-2">
            <div className="w-12 h-12 rounded-full bg-pink-300" />
            <div className="flex flex-col ml-2 justify-center">
              <div className="text-sm font-semibold">Name</div>
              <div className="text-xs opacity-75">location</div>
            </div>
          </div>
          <div className="flex flex-col py-2 border-b-2">
            <h1 className="text-xl font-bold">Title</h1>
            <h2 className="text-lg font-semibold">Price</h2>
            <p className="text-sm text-justify">
              My money&apos;s in that office, right? If she start giving me some
              bullshit about it ain&apos;t there, and we got to go someplace
              else and get it, I&apos;m gonna shoot you in the head then and
              there. Then I&apos;m gonna shoot that bitch in the kneecaps, find
              out where my goddamn money is. She gonna tell me too. Hey, look at
              me when I&apos;m talking to you, motherfucker. You listen: we go
              in there, and that ni**a Winston or anybody else is in there, you
              the first motherfucker to get shot. You understand?
            </p>
          </div>
          <div className="bg-white flex items-center py-4 px-1 w-full max-w-xl">
            <button className="bg-orange-400 w-full text-white rounded-sm py-1 ring-2 ring-offset-1 ring-orange-400 hover:bg-orange-500 active:bg-orange-300">
              Talk to seller
            </button>
            <button className="px-3 text-gray-400">
              <svg
                className="h-6 w-6 "
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
          <div className="py-1">
            <h2 className="text-base font-semibold py-1">Similar Items</h2>
            <div className="grid grid-cols-2 gap-2 ">
              {[1, 2, 3, 4, 5, 6].map((_, i) => (
                <div key={i} className="w-full">
                  <div className="bg-slate-500 h-44 rounded-md" />
                  <h3 className="font-medium text-sm">Galaxy S60</h3>
                  <p className="font-semibold text-sm">$6</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
