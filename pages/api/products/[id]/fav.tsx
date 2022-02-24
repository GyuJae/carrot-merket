import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Product, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IProductFavResponse extends IResponse {}

export const favToggleFetch = (id: string) =>
  fetch(`/api/products/${id}/fav`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IProductFavResponse>
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
    const existProduct = await prisma.product.findUnique({
      where: {
        id: +id.toString(),
      },
      select: {
        id: true,
      },
    });
    if (!existProduct) {
      return res.json({
        ok: false,
        error: "This product id does not exist.",
      });
    }
    const existFav = await prisma.fav.findUnique({
      where: {
        userId_productId: {
          userId: user.id,
          productId: existProduct.id,
        },
      },
    });
    if (existFav) {
      await prisma.fav.delete({
        where: {
          id: existFav.id,
        },
      });
    } else {
      await prisma.fav.create({
        data: {
          userId: user.id,
          productId: existProduct.id,
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

export default withApiSession(withHandler({ methods: ["GET"], handler }));
