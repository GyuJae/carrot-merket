import FloatingButton from "@components/FloatingButton";
import useCoords from "@libs/client/hooks/useCoords";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { IPostsResponse } from "pages/api/communities/index";
import useSWR from "swr";
import Layout from "../../components/layout";

const Communtiy: NextPage = () => {
  const router = useRouter();
  const { latitude, longitude } = useCoords();
  const { data } = useSWR<IPostsResponse>(
    latitude && longitude
      ? `/api/communities?latitude=${latitude}&longitude=${longitude}`
      : null
  );
  return (
    <Layout title="동네생활" hasTabBar>
      <div className="px-4 py-4">
        <div className="text-sm bg-gray-300 w-max rounded-md p-[1.9px] font-semibold mb-1">
          동네질문
        </div>
        <div className="flex flex-col">
          {data?.posts?.map((post) => (
            <div
              key={post.id}
              className="border-b-[1.5px] py-4"
              onClick={() => router.push(`/community/${post.id}`)}
            >
              <div className="font-medium mb-3 flex items-center ">
                <span className="text-orange-500 font-semibold mr-2 mb-1">
                  Q.
                </span>{" "}
                {post.question}
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400 mb-2">
                <span>{post.user.name}</span>
                <span>{post.createdAt}</span>
              </div>
              <div className="flex space-x-4 font-normal text-sm text-gray-500">
                <span className="flex space-x-1 items-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  <span>궁금해요 {post._count.wonderings}</span>
                </span>
                <span className="flex space-x-1 items-center">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  <span>답변 {post._count.answers}</span>
                </span>
              </div>
            </div>
          ))}
          <FloatingButton onClick={() => router.push("community/write")}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </FloatingButton>
        </div>
      </div>
    </Layout>
  );
};

export default Communtiy;
