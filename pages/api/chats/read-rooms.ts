import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { TalkMessage, TalkRoom, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

interface ITalkMessageWithName extends TalkMessage {
  user: User;
}

interface IRoomWithTalkMessages extends TalkRoom {
  seller: User;
  buyer: User;
  talkMessages: ITalkMessageWithName[];
}

export interface IReadRoomsResponse extends IResponse {
  rooms?: IRoomWithTalkMessages[] | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IReadRoomsResponse>
) => {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }
    const {
      session: { user },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: `No Authorization.`,
      });
    }

    const rooms = await prisma.talkRoom.findMany({
      where: {
        OR: [
          {
            sellerId: user.id,
          },
          {
            buyerId: user.id,
          },
        ],
      },
      include: {
        seller: true,
        buyer: true,
        talkMessages: {
          include: {
            user: true,
          },
        },
      },
    });

    return res.json({
      ok: true,
      rooms,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
