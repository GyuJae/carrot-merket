import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Post, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

interface IPost extends Post {
  _count: {
    answers: number;
    wonderings: number;
  };
  user: User;
}

export interface IPostsResponse extends IResponse {
  posts?: IPost[] | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IPostsResponse>
) => {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }

    const posts = await prisma.post.findMany({
      include: {
        _count: true,
        user: true,
      },
    });

    return res.json({
      ok: true,
      posts,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
