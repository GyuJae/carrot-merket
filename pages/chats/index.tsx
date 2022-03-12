import Loading from "@components/Loading";
import useUser from "@libs/client/hooks/useUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { IReadRoomsResponse } from "pages/api/chats/read-rooms";
import useSWR from "swr";
import ChatItem from "../../components/ChatItem";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  const router = useRouter();
  const { data } = useSWR<IReadRoomsResponse>("/api/chats/read-rooms", {
    refreshInterval: 1000,
  });
  const { user, isLoading } = useUser();
  if (!data || isLoading || !user) {
    return (
      <Layout title="채팅" hasTabBar>
        <div className="py-20 flex justify-center items-center">
          <Loading />
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="채팅" hasTabBar>
      <div className=" divide-y-[1px]">
        {data && data.rooms ? (
          data.rooms.map((room) => (
            <div key={room.id} onClick={() => router.push(`/chats/${room.id}`)}>
              <ChatItem
                avatar={
                  user.id === room.buyerId
                    ? room.seller.avatar
                    : room.buyer.avatar
                }
                chatName={
                  user.id === room.buyerId ? room.seller.name : room.buyer.name
                }
                recentPayload={
                  room.talkMessages[room.talkMessages.length - 1].payload
                }
              />
            </div>
          ))
        ) : (
          <div>No Rooms</div>
        )}
      </div>
    </Layout>
  );
};

export default Chats;
