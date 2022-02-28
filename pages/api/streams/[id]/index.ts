import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { Product, Stream, User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IStreamDetailResponse extends IResponse {
  stream?: Stream;
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IStreamDetailResponse>
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

    const stream = await prisma.stream.findUnique({
      where: {
        id: +id.toString(),
      },
    });
    if (!stream) {
      return {
        ok: false,
        error: "This stream id does not exist.",
      };
    }

    return res.json({
      ok: true,
      stream,
    });
  } catch (error) {
    return res.json({
      ok: false,
      error: `Error: ${error}`,
    });
  }
};

export default withApiSession(withHandler({ methods: ["GET"], handler }));
