import Loading from "@components/Loading";
import useUser from "@libs/client/hooks/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  createChatFetch,
  ICreateChatForm,
} from "pages/api/chats/[id]/create-chat";
import { IReadChatsResponse } from "pages/api/chats/[id]/read-chats";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useSWR from "swr";
import ChatMessageItem from "../../components/ChatMessageItem";
import Layout from "../../components/layout";

const ChatDetail: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const {
    query: { id },
  } = router;

  const { data } = useSWR<IReadChatsResponse>(
    id ? `/api/chats/${id}/read-chats` : null,
    {
      refreshInterval: 1000,
    }
  );

  const { mutate, isLoading } = useMutation(
    (d: ICreateChatForm) => createChatFetch(d),
    {}
  );

  const { register, handleSubmit, reset } = useForm<ICreateChatForm>();

  const onSubmit: SubmitHandler<ICreateChatForm> = ({ payload }) => {
    mutate({ payload, roomId: +(id as string) });
    reset();
  };

  return (
    <Layout title="Chat Detail" canGoBack>
      <div className="flex flex-col pt-3 pb-20 px-2">
        {data?.chats &&
          data.chats.map((chat) => (
            <ChatMessageItem
              key={chat.id}
              name={chat.user.name}
              payload={chat.payload}
              me={chat.userId === user?.id}
              avatar={chat.user.avatar ?? undefined}
            />
          ))}
        <div className="fixed bottom-0 px-3 py-2 shadow-sm w-full max-w-xl bg-white">
          <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
            <input
              autoComplete="off"
              {...register("payload")}
              type="text"
              className="w-full focus:ring-orange-500 rounded-l-md border-gray-300 focus:border-orange-500 focus:border-l-0"
            />
            {isLoading ? (
              <div className="flex justify-center items-center bg-text p-2 ml-1 rounded-r-md">
                <Loading />
              </div>
            ) : (
              <button
                type="submit"
                className="p-2 bg-orange-400 ml-1 text-white font-semibold rounded-r-md cursor-pointer"
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            )}
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default ChatDetail;
