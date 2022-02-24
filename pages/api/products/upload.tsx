import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IUploadProductResponse extends IResponse {
  productId?: number | null;
}

export interface IUploadProductForm {
  name: string;
  price: number;
  description: string;
}

export const uploadProductFetch = (data: IUploadProductForm) =>
  fetch("/api/products/upload", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IUploadProductResponse>
) {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }

    const {
      session: { user },
      body: { name, price, description },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }
    const product = await prisma.product.create({
      data: {
        userId: user.id,
        name,
        price: +price,
        description,
        image: "not yet",
      },
      select: {
        id: true,
      },
    });
    return res.status(200).json({
      ok: true,
      productId: product.id,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
