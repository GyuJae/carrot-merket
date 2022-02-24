import withHandler, { IResponse } from "@libs/server/withHandler";
import { Token } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IEnterResponse extends IResponse {
  token?: Token | null;
}

export interface IEnterForm {
  email?: string;
  phone?: number;
}

export const enterFetch = (data: IEnterForm) =>
  fetch("/api/users/enter", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEnterResponse>
) {
  try {
    if (!prisma) {
      return {
        ok: false,
        error: "Prisma null",
      };
    }
    const { email, phone } = req.body;
    const payload = Date.now() + Math.ceil(Math.random() * 999999) + "";
    const userPayload = phone ? { phone: +phone } : email ? { email } : null;
    if (!userPayload)
      return res.status(400).json({
        ok: false,
        error: "Form Error",
      });

    const token = await prisma.token.create({
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

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
