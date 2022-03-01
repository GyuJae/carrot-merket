import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";

export interface IEditProfileForm {
  name: string;
  email?: string;
  phone?: string;
  formErrors?: string;
  avatar?: FileList;
  avatarId?: number;
}

export interface IEditProfileResponse extends IResponse {}

export const editProfileFetch = (data: IEditProfileForm) =>
  fetch("/api/users/edit", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IEditProfileResponse>
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
      body: { email, phone, name, avatarId },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }
    const me = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        email: true,
        phone: true,
      },
    });
    if (!me) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }
    if (email) {
      const exist = await prisma.user.findUnique({
        where: {
          email,
        },
        select: { id: true, email: true },
      });
      if (exist && !(exist.email === me.email)) {
        return res.json({
          ok: false,
          error: "This email already exist.",
        });
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          email,
          name,
        },
      });
    }
    if (phone) {
      const exist = await prisma.user.findUnique({
        where: {
          phone,
        },
        select: { id: true, phone: true },
      });
      if (exist && !(exist.phone === me.phone)) {
        return res.json({
          ok: false,
          error: "This phone already exist.",
        });
      }
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          phone,
          name,
        },
      });
    }
    if (avatarId) {
      await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatar: avatarId + "",
        },
      });
    }
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
