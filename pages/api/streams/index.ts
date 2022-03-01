import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Stream } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IStreamsResponse extends IResponse {
  streams?: Stream[] | null;
  totalPage?: number;
  totalResult?: number;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IStreamsResponse>
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
      query: { page },
    } = req;

    if (!user) {
      return {
        ok: false,
        error: "No Authorization.",
      };
    }

    const streams = await prisma.stream.findMany({
      take: 20,
      skip: (+page || 1 - 1) * 20,
    });
    const totalResult = await prisma.stream.count({});

    return res.json({
      ok: true,
      streams,
      totalResult,
      totalPage: Math.ceil(totalResult / 20),
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
