import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Fav } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IFavsResponse extends IResponse {
  favs?: Fav[] | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IFavsResponse>
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
      return res.json({
        ok: false,
        error: "No Authorization.",
      });
    }
    const favs = await prisma.fav.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
    return res.json({
      ok: true,
      favs,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
