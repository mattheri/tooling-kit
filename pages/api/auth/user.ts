// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage, User } from "../../../types";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../utils/session-options";

interface ApiError {
  message: string;
}

type Response = ApiError | User | null;

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  try {
    const user = req.session.user ?? null;

    res.status(200).json(user);
  } catch (e) {
    const error = e as Error;

    res
      .status(500)
      .json({ message: `${ErrorMessage.UnknownError} - ${error.message}` });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
