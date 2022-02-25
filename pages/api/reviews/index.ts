import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Review, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

interface IReview extends Review {
  writer: User;
}

export interface IReviewsResponse extends IResponse {
  reviews?: IReview[] | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IReviewsResponse>
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

    if (!user) return res.json({ ok: false });
    const reviews = await prisma.review.findMany({
      where: {
        receiverId: user.id,
      },
      include: {
        writer: true,
      },
    });
    return res.json({
      ok: true,
      reviews,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
