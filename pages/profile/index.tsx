import useUser from "@libs/client/hooks/useUser";
import { NextPage, NextPageContext } from "next";
import { useRouter } from "next/router";
import useSWR, { SWRConfig } from "swr";
import Layout from "../../components/layout";
import { IReviewsResponse } from "pages/api/reviews/index";
import { classToString, fileToUrl } from "@libs/client/utils";
import Image from "next/image";
import { User } from "@prisma/client";
import { withSsrSession } from "@libs/server/withSession";
import client from "@libs/server/client";

const Profile: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data } = useSWR<IReviewsResponse>("/api/reviews");
  return (
    <Layout title="나의 캐럿" hasTabBar>
      <div className="px-4 py-4">
        <div className="flex items-center">
          {user?.avatar ? (
            <Image
              src={fileToUrl({ fileId: user.avatar, variant: "avatar" })}
              alt="avatar"
              width={64}
              height={64}
              className="w-16 h-16 bg-gray-400 rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-500 rounded-full" />
          )}
          <div className="flex flex-col ml-3">
            <span className="font-semibold text-sm">{user?.name}</span>
            <span
              className="text-gray-500 text-xs cursor-pointer hover:underline active:text-gray-300"
              onClick={() => router.push("/profile/edit")}
            >
              Edit profile &rarr;
            </span>
          </div>
        </div>
        <div className="flex justify-around py-10">
          <div className="flex flex-col items-center">
            <div
              onClick={() => router.push("/profile/sold")}
              className="mb-1 bg-orange-400 p-4 rounded-full text-white cursor-pointer hover:bg-orange-500 active:bg-orange-300"
            >
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <span className="text-sm">판매내역</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              onClick={() => router.push("/profile/bought")}
              className="mb-1 bg-orange-400 p-4 rounded-full text-white cursor-pointer hover:bg-orange-500 active:bg-orange-300"
            >
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <span className="text-sm">구매내역</span>
          </div>
          <div className="flex flex-col items-center">
            <div
              onClick={() => router.push("/profile/loved")}
              className="mb-1 bg-orange-400 p-4 rounded-full text-white cursor-pointer hover:bg-orange-500 active:bg-orange-300"
            >
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span className="text-sm">관심목록</span>
          </div>
        </div>
        <div>
          {data?.reviews?.map((review) => (
            <div key={review.id} className="border-b-[1px] py-2">
              <div className="flex space-x-4 items-center">
                {review.writer.avatar ? (
                  <Image
                    alt="avatar"
                    src={fileToUrl({
                      fileId: review.writer.avatar,
                      variant: "avatar",
                    })}
                    width={48}
                    height={48}
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-slate-300" />
                )}
                <div>
                  <h4 className="text-sm font-bold text-gray-800">
                    {review.writer.name}
                  </h4>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className={classToString(
                          "h-5 w-5",
                          review.score >= star
                            ? "text-yellow-400"
                            : "text-gray-400"
                        )}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 text-gray-600 text-sm">
                <p>{review.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

const Page: NextPage<{ profile: User }> = ({ profile }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/users/me": { ok: true, profile },
        },
      }}
    >
      <Profile />
    </SWRConfig>
  );
};

export const getServerSideProps = withSsrSession(async function ({
  req,
}: NextPageContext) {
  const profile = await client?.user.findUnique({
    where: { id: req?.session.user?.id },
  });
  return {
    props: {
      profile: JSON.parse(JSON.stringify(profile)),
    },
  };
});

export default Page;
