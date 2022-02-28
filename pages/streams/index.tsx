import FloatingButton from "@components/FloatingButton";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { IStreamsResponse } from "pages/api/streams";
import useSWR from "swr";
import Layout from "../../components/layout";
import StreamItem from "../../components/StreamItem";

const Streams: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<IStreamsResponse>("/api/streams");
  return (
    <Layout title="라이브" hasTabBar>
      <div className="px-4">
        <div className="divide-y-[1.5px]">
          {data?.streams?.map((stream) => (
            <StreamItem
              key={stream.id}
              stream={stream}
              onClick={() => router.push(`/streams/${stream.id}`)}
            />
          ))}
        </div>
        <FloatingButton
          onClick={() => router.push("/streams/create")}
          className="fixed bottom-24 right-3 bg-orange-400 hover:bg-orange-500 active:bg-orange-300 transition-colors p-2 rounded-full text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
