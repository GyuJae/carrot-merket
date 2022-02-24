import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Product, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IToggleWonderResponse extends IResponse {}

export const toggleWonderFetch = (id: string) =>
  fetch(`/api/communities/${id}/wonder`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IToggleWonderResponse>
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
      return {
        ok: false,
        error: "No authorization.",
      };
    }
    const post = await prisma.post.findUnique({
      where: {
        id: +id.toString(),
      },
      select: {
        id: true,
      },
    });
    if (!post) {
      return res.json({
        ok: false,
        error: "This post id does not exist.",
      });
    }
    const existWondering = await prisma.wondering.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });
    if (existWondering) {
      await prisma.wondering.delete({
        where: {
          id: existWondering.id,
        },
      });
    } else {
      await prisma.wondering.create({
        data: {
          userId: user.id,
          postId: post.id,
        },
      });
    }
    return res.json({
      ok: true,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["POST"], handler }));
