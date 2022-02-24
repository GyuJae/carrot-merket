import withHandler, { IResponse } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@libs/server/client";
import { Answer, User } from "@prisma/client";

interface IAnswerWithUser extends Answer {
  user: User;
}

export interface IPostAnswerResponse extends IResponse {
  answer?: IAnswerWithUser | null;
}

export interface IAnswerForm {
  answer: string;
}

export const answerPostFetch = (data: IAnswerForm, id: string) =>
  fetch(`/api/communities/${id}/answer`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IPostAnswerResponse>
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
      body: { answer },
      query: { id },
    } = req;
    if (!user) {
      return res.status(401).json({
        ok: false,
        error: "No Authorization",
      });
    }
    const post = await prisma.post.findUnique({
      where: {
        id: +id.toString(),
      },
    });
    if (!post) {
      return res.status(404).json({
        ok: false,
        error: "This postId does not exist",
      });
    }
    const answerResult = await prisma.answer.create({
      data: {
        userId: user.id,
        postId: post?.id,
        answer,
      },
      include: {
        user: true,
      },
    });
    return res.json({
      ok: true,
      answer: answerResult,
    });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      error: `Error Occured ${error}`,
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
