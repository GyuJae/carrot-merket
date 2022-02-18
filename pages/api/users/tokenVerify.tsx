import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  try {
    const { payload } = req.body;
    const token = await client.token.findUnique({
      where: {
        payload,
      },
    });
    if (!token) return res.status(404).end();
    req.session.user = {
      id: token.userId,
    };
    await req.session.save();
    await client.token.deleteMany({
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
  withHandler({ method: "POST", handler, isPrivate: false })
);
