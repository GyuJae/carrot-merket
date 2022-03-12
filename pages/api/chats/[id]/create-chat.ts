import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface ICreateChatResponse extends IResponse {}

export interface ICreateChatForm {
  payload: number;
  roomId?: number;
}

export const createChatFetch = ({ roomId, payload }: ICreateChatForm) =>
  fetch(`/api/chats/${roomId}/create-chat`, {
    method: "POST",
    body: JSON.stringify({ roomId, payload }),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICreateChatResponse>
) {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }

    const {
      session: { user },
      body: { roomId, payload },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }
    const room = await prisma.talkRoom.findUnique({
      where: {
        id: +roomId,
      },
      select: {
        id: true,
      },
    });
    if (!room) {
      return res.status(401).json({
        ok: false,
        error: "This Room does not exist.",
      });
    }

    await prisma.talkMessage.create({
      data: {
        talkRoomId: room.id,
        payload,
        userId: user.id,
      },
    });

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
