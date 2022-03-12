import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { TalkMessage, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

interface ITalkMessageWithName extends TalkMessage {
  user: User;
}

export interface IReadChatsResponse extends IResponse {
  chats?: ITalkMessageWithName[] | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IReadChatsResponse>
) => {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }
    const {
      query: { id },
      session: { user },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: `No Authorization.`,
      });
    }
    if (!id) {
      return res.status(404).json({
        ok: false,
        error: "No Page.",
      });
    }
    const room = await prisma.talkRoom.findUnique({
      where: {
        id: +(id as string),
      },
      include: {
        talkMessages: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!room) {
      return res.status(404).json({
        ok: false,
        error: "This room does not exist.",
      });
    }

    return res.json({
      ok: true,
      chats: room.talkMessages,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
