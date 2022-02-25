import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IMeResponse extends IResponse {
  user?: User | null;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IMeResponse>
) => {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }
    if (!req.session.user?.id) {
      return res.json({ ok: false });
    }
    const user = await prisma.user.findUnique({
      where: {
        id: req.session.user.id,
      },
    });

    if (!user) return res.json({ ok: false });
    return res.json({
      ok: true,
      user,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
