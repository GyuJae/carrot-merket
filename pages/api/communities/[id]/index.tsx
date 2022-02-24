import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Answer, Post, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

interface IAnswers extends Answer {
  user: User;
}

interface PostDetail extends Post {
  user: User;
  answers: IAnswers[];
  _count: {
    answers: number;
    wonderings: number;
  };
}

export interface IPostDetailResponse extends IResponse {
  post?: PostDetail | null;
  isWondering?: boolean | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IPostDetailResponse>
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
        error: "No Authorization.",
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: +id.toString(),
      },
      include: {
        user: true,
        _count: true,
        answers: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!post) {
      return res.json({
        ok: false,
        error: "This post Id does not exist.",
      });
    }
    const wondering = await prisma.wondering.findUnique({
      where: {
        userId_postId: {
          userId: user.id,
          postId: post.id,
        },
      },
    });
    return res.json({
      ok: true,
      post,
      isWondering: wondering ? true : false,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
