import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IStreamMessageUploadResponse extends IResponse {}

export interface IUploadMessageForm {
  message: string;
}

export const uploadStreamMessageFetch = (
  data: IUploadMessageForm,
  id: string
) =>
  fetch(`/api/streams/${id}/messages/upload`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IStreamMessageUploadResponse>
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
      body: { message },
      query: { id },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }

    await prisma.message.create({
      data: {
        message,
        streamId: +id.toString(),
        userId: user.id,
      },
    });

    return res.status(200).json({
      ok: true,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
