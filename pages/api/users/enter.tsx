import client from "@libs/server/client";
import withHandler from "@libs/server/withHandler";
import { Token } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

interface ResponseType {
  ok: boolean;
  token?: Token | null;
  error?: string | null;
  [key: string]: any;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    const { email, phone } = req.body;
    const user = phone ? { phone: +phone } : email ? { email } : null;
    if (!user)
      return res
        .status(400)
        .json({ ok: false, error: "email and phone error" });
    const payload = Math.floor(10000 + Math.random() * 9000000) + "";
    const token = await client.token.create({
      data: {
        payload,
        user: {
          connectOrCreate: {
            where: {
              ...user,
            },
            create: {
              name: "Anonymous",
              ...user,
            },
          },
        },
      },
    });
    return res.status(200).json({
      ok: true,
      token,
    });
  } catch {
    return res.status(400).json({
      ok: false,
      error: "Error Occure",
    });
  }
}

export default withHandler("POST", handler);
