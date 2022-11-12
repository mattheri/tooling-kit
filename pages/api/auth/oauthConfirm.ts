// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthType, ErrorMessage, User } from "../../../types";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../utils/session-options";

interface ApiError {
  message: string;
}

interface UserWithToken extends User {
  token: string;
}

type Response = ApiError | UserWithToken;

async function handler(req: NextApiRequest, res: NextApiResponse<Response>) {
  const url = `${process.env.DATABASE_URL}/auths/login`;

  if (!req.body.url) {
    return res.status(500).json({ message: ErrorMessage.UnknownError });
  }

  const token = new URL(req.body.url).searchParams.get("code");

  if (!token) {
    return res.status(500).json({ message: ErrorMessage.CannotFindCode });
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        code: token,
        service: AuthType.Google,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `${ErrorMessage.UnknownError} - ${response.status} - ${response.statusText}`
      );
    }

    const { data } = await response.json();

    const flattenUser = {
      ...data.user,
      token: data.token,
    };

    req.session.user = flattenUser;

    res.status(200).json({ ...flattenUser });
  } catch (e) {
    const error = e as Error;

    res
      .status(500)
      .json({ message: `${ErrorMessage.UnknownError} - ${error.message}` });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
