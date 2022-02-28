import LiveMessage from "@components/LiveMessage";
import useUser from "@libs/client/hooks/useUser";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { IStreamDetailResponse } from "pages/api/streams/[id]";
import {
  IStreamMessageUploadResponse,
  IUploadMessageForm,
  uploadStreamMessageFetch,
} from "pages/api/streams/[id]/messages/upload";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import useSWR from "swr";
import Layout from "../../components/layout";

const Stream: NextPage = () => {
  const router = useRouter();
  const { user } = useUser();
  const { data, mutate } = useSWR<IStreamDetailResponse>(
    router.query.id ? `/api/streams/${router.query.id}` : null
  );
  console.log(data);
  const { mutate: sendMessage, isLoading } = useMutation(
    (data: IUploadMessageForm) =>
      uploadStreamMessageFetch(data, (router.query.id + "") as string),
    {
      onSuccess: (data: IStreamMessageUploadResponse) => {
        if (data.ok) {
          mutate();
        }
      },
    }
  );
  const { register, handleSubmit, reset } = useForm<IUploadMessageForm>();
  const onSubmit: SubmitHandler<IUploadMessageForm> = (data) => {
    if (isLoading) return;
    reset();
    sendMessage(data);
  };
  return (
    <Layout title="Live Detail" canGoBack>
      <div>
        <div className="py-4 px-2">
          <div className="w-full h-48 bg-gray-400 rounded-md shadow-sm" />
          <div className="mt-2 px-2 font-semibold text-lg ">
            {data?.stream?.name}
          </div>
          <div className="mt-2 px-2 font-semibold text-base ">
            ${data?.stream?.price}
          </div>
          <div className="mt-2 px-2  text-sm ">{data?.stream?.description}</div>
        </div>
        <div className="relative">
          <div className="font-semibold text-lg mb-2 px-1 ">Live Chats</div>
          <div className="flex flex-col px-4 overflow-y-scroll h-80 space-y-[3.5px] bg-gray-100 py-1">
            {data?.stream &&
              data.stream.messages.map((message) => (
                <LiveMessage
                  key={message.id}
                  message={message}
                  isMe={message.userId === user?.id}
                />
              ))}

            <div className="absoluted bottom-0 w-full py-2">
              <form onSubmit={handleSubmit(onSubmit)} className="flex w-full">
                <input
                  {...register("message", { required: true })}
                  type="text"
                  className="shadow-md w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500"
                />
                <button
                  type="submit"
                  className="p-2 bg-orange-400 text-white font-semibold rounded-r-md ml-1 cursor-pointer"
                >
                  <span>&rarr;</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Stream;
