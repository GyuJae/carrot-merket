import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface ICreateRoomResponse extends IResponse {
  roomId?: number | null;
}

interface ICreateRoomFetch {
  sellerId?: number;
  buyerId?: number;
}

export const createRoomFetch = (data: ICreateRoomFetch) =>
  fetch("/api/chats/create-room", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ICreateRoomResponse>
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
      body: { sellerId, buyerId },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }
    const { id } = await prisma.talkRoom.create({
      data: {
        sellerId,
        buyerId,
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      ok: true,
      roomId: id,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
