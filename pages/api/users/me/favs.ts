import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Fav, Product } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

interface IProduct extends Product {
  _count: {
    favs: number;
  };
}

export interface IFavsResponse extends IResponse {
  products?: IProduct[] | null;
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
        product: {
          include: {
            _count: {
              select: {
                favs: true,
              },
            },
          },
        },
      },
    });
    return res.json({
      ok: true,
      products: favs.map((fav) => fav.product),
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
