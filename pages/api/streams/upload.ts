import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface ILiveUploadResponse extends IResponse {
  streamId?: number;
}

export interface IUploadLiveForm {
  name: string;
  price: number;
  description: string;
}

export const uploadLiveFetch = (data: IUploadLiveForm) =>
  fetch("/api/streams/upload", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ILiveUploadResponse>
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
    const { id: streamId } = await prisma.stream.create({
      data: {
        name,
        price,
        description,
        userId: user.id,
      },
      select: {
        id: true,
      },
    });

    return res.status(200).json({
      ok: true,
      streamId,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
