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
    const {
      query: { latitude, longitude },
    } = req;
    const parsedLatitude = parseFloat(latitude.toString());
    const parsedLognitude = parseFloat(longitude.toString());
    const posts = await prisma.post.findMany({
      include: {
        _count: true,
        user: true,
      },
      where: {
        latitude: {
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude + 0.01,
        },
        longitude: {
          gte: parsedLognitude - 0.01,
          lte: parsedLognitude + 0.01,
        },
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
