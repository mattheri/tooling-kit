// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { ErrorMessage, User } from "../../../types";
import { withIronSessionApiRoute } from "iron-session/next";
import sessionOptions from "../../../utils/session-options";

type ApiError = {
  message: string;
};

interface UserWithToken extends User {
  token: string;
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UserWithToken | ApiError>
) {
  const { email, password } = req.body;
  const emailRegex =
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&-])[A-Za-z\d@$!%*#?&-]{8,}$/gm;

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: ErrorMessage.InvalidEmail });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ message: ErrorMessage.InvalidPassword });
  }

  const url = `${process.env.DATABASE_URL}/auths/signupWithPassword`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.API_KEY}`,
      },
      body: JSON.stringify({
        email,
        username: email,
        password,
      }),
    });

    if (!response.ok) {
      throw new Error(
        `${ErrorMessage.UnknownError} - ${response.status} - ${response.statusText}`
      );
    }

    const { data } = await response.json();

    if (!data.user) {
      throw new Error(ErrorMessage.NoUserFound);
    }

    const flattenUser = {
      ...data.user,
      token: data.token,
    };

    req.session.user = flattenUser;

    res.status(200).json({ ...flattenUser });
  } catch (e) {
    const error = e as Error;

    return res
      .status(500)
      .json({ message: `${ErrorMessage.UnknownError} - ${error.message}` });
  }
}

export default withIronSessionApiRoute(handler, sessionOptions);
