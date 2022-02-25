import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IWriteFormResponse extends IResponse {
  postId?: number | null;
}

export interface IWriteForm {
  question: string;
}

export interface IFetchPostWrite extends IWriteForm {
  latitude?: number | null;
  longitude?: number | null;
}

export const writePostFetch = (data: IFetchPostWrite) =>
  fetch("/api/communities/write", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IWriteFormResponse>
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
      body: { question, latitude, longitude },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }
    const post = await prisma.post.create({
      data: {
        userId: user.id,
        question,
        latitude,
        longitude,
      },
      select: {
        id: true,
      },
    });
    return res.status(200).json({
      ok: true,
      postId: post.id,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
