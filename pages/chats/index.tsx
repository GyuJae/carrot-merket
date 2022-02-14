import { NextPage } from "next";
import ChatItem from "../../components/ChatItem";
import Layout from "../../components/layout";

const Chats: NextPage = () => {
  return (
    <Layout title="채팅" hasTabBar>
      <div className=" divide-y-[1px]">
        {[1, 2, 3, 4, 5, 6, 7, 8, 0].map((i) => (
          <ChatItem
            key={i}
            chatName="Steve Jebs"
            recentPayload="See you tomorrow in the corner at 2pm"
          />
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
