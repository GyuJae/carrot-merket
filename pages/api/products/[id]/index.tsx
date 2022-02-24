import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Product, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

interface ProductWiihUser extends Product {
  user: User;
}

export interface IProductDetailResponse extends IResponse {
  product?: ProductWiihUser | null;
  similarProducts?: Product[] | null;
  isLiked?: boolean | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IProductDetailResponse>
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
    const product = await prisma.product.findUnique({
      where: {
        id: +id.toString(),
      },
      include: {
        user: true,
      },
    });
    if (!product) {
      return {
        ok: false,
        error: "This product id does not exist.",
      };
    }
    const term = product.name.split(" ").map((word) => ({
      name: {
        contains: word,
      },
    }));
    const similarProducts = await prisma.product.findMany({
      where: {
        OR: term,
        AND: {
          id: {
            not: product.id,
          },
        },
      },
    });
    const isLiked = await prisma.fav.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: product.id,
        },
      },
    });
    return res.json({
      ok: true,
      product,
      similarProducts,
      isLiked: isLiked ? true : false,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
