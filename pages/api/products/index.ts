import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Product, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

interface ICount {
  favs: number;
}

export interface IProductWithCount extends Product {
  _count: ICount;
}

export interface IProductsResponse extends IResponse {
  products?: IProductWithCount[] | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IProductsResponse>
) => {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }

    const products = await prisma.product.findMany({
      include: {
        _count: true,
      },
    });
    return res.json({
      ok: true,
      products,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
