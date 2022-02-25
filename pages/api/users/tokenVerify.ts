import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IEnterTokenForm {
  payload: string;
}

export const tokenVerifyFetch = (data: IEnterTokenForm) =>
  fetch("/api/users/tokenVerify", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }
    const { payload } = req.body;
    const token = await prisma.token.findUnique({
      where: {
        payload,
      },
    });
    if (!token) return res.status(404).end();
    req.session.user = {
      id: token.userId,
    };
    await req.session.save();
    await prisma.token.deleteMany({
      where: {
        userId: token.userId,
      },
    });
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

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false })
);
