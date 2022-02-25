import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Purchase } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface ISalesResponse extends IResponse {
  sales?: Purchase[] | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ISalesResponse>
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
    const sales = await prisma.sale.findMany({
      where: {
        userId: user.id,
      },
      include: {
        product: true,
      },
    });
    return res.json({
      ok: true,
      sales,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
