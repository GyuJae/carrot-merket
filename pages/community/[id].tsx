import SubmitButton from "@components/submit-button";
import Textarea from "@components/Textarea";
import { classToString } from "@libs/client/utils";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import {
  answerPostFetch,
  IAnswerForm,
  IPostAnswerResponse,
} from "pages/api/communities/[id]/answer";
import { IPostDetailResponse } from "pages/api/communities/[id]/index";
import { toggleWonderFetch } from "pages/api/communities/[id]/wonder";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useSWR from "swr";
import Layout from "../../components/layout";

const CommunityPostDetail: NextPage = () => {
  const router = useRouter();

  const { data, mutate: mutateSWR } = useSWR<IPostDetailResponse>(
    router.query.id ? `/api/communities/${router.query.id}` : null
  );

  const { mutate: toggleWondering, isLoading } = useMutation(
    () => toggleWonderFetch(router.query.id + ""),
    {
      onSuccess: () => {},
    }
  );
  const { mutate: answerMutate, isLoading: isAnswerLoading } = useMutation(
    (data: IAnswerForm) => answerPostFetch(data, router.query.id + ""),
    {
      onSuccess: (success: IPostAnswerResponse) => {
        if (
          success.ok &&
          data &&
          data.post &&
          data.post.answers &&
          success.answer
        ) {
          mutateSWR(
            {
              ...data,
              post: {
                ...data.post,
                answers: [...data.post.answers, success.answer],
                _count: {
                  ...data.post._count,
                  answers: data.post._count.answers + 1,
                },
              },
            },
            false
          );
        }
      },
    }
  );

  const onClickWondering = () => {
    if (!data || !data.post) return;
    mutateSWR(
      {
        ...data,
        post: {
          ...data.post,
          _count: {
            ...data.post._count,
            wonderings: data.isWondering
              ? data.post?._count.wonderings - 1
              : data.post?._count.wonderings + 1,
          },
        },
        isWondering: !data.isWondering,
      },
      false
    );
    if (!isLoading) {
      toggleWondering();
    }
  };

  const { register, handleSubmit, reset } = useForm<IAnswerForm>();

  const onAnswerSubmit: SubmitHandler<IAnswerForm> = (data) => {
    reset();
    answerMutate(data);
  };

  return (
    <Layout title="Community" canGoBack>
      <div className="py-4 ">
        <div className="text-sm m-2 mb-4 bg-gray-300 w-max rounded-md p-[1.9px] font-semibold ">
          동네질문
        </div>
        <div className="flex mb-3 px-4  pb-3  border-b items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-slate-300" />
          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.post?.user.name}
            </p>
            <p className="text-xs font-medium text-gray-500 cursor-pointer hover:underline">
              View profile &rarr;
            </p>
          </div>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span>{" "}
            {data?.post?.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b-[2px]  w-full">
            <span
              className={classToString(
                "flex space-x-2 items-center text-sm",
                data?.isWondering ? "text-teal-500 font-semibold" : ""
              )}
            >
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
              <span onClick={onClickWondering} className="cursor-pointer">
                궁금해요 {data?.post?._count.wonderings}
              </span>
            </span>
            <span className="flex space-x-2 items-center text-sm">
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
              <span>답변 {data?.post?._count.answers}</span>
            </span>
          </div>
        </div>
        <form onSubmit={handleSubmit(onAnswerSubmit)} className="px-4">
          <Textarea
            name="answer"
            rows={2}
            required
            placeholder="Answer this question!"
            register={register("answer", { required: true })}
          />
          <SubmitButton isLoading={isAnswerLoading} payload={"Reply"} />
        </form>
        <div className="px-4 mt-3 space-y-5 ">
          {data?.post?.answers?.map((answer) => (
            <div
              key={answer.id}
              className="flex items-start space-x-3 py-2 border-b-[1.1px] last:border-b-0 "
            >
              <div className="w-8 h-8 bg-slate-200 rounded-full mt-2 ml-1" />
              <div>
                <span className="text-sm block font-semibold text-gray-700">
                  {answer.user.name}
                </span>
                <span className="text-xs text-gray-500 block ">
                  {answer.createdAt.setDate}
                </span>
                <p className="text-gray-700 mt-2">{answer.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CommunityPostDetail;
