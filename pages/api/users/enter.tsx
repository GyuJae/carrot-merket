import client from "@libs/server/client";
import withHandler, { IResponse } from "@libs/server/withHandler";
import { Token } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export interface IEnterResponse extends IResponse {
  token?: Token | null;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEnterResponse>
) {
  try {
    const { email, phone } = req.body;
    const payload = Date.now() + Math.ceil(Math.random() * 999999) + "";
    const userPayload = phone ? { phone: +phone } : email ? { email } : null;
    if (!userPayload)
      return res.status(400).json({
        ok: false,
        error: "Form Error",
      });

    const token = await client.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              ...userPayload,
            },
            create: {
              ...userPayload,
              name: "No Name",
            },
          },
        },
      },
    });
    return res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}

export default withHandler("POST", handler);
