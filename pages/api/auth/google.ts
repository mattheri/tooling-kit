// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { AuthType, ErrorMessage } from "../../../types";

interface ApiError {
  message: string;
}

interface Redirect {
  url: string;
}

type Response = ApiError | Redirect;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const url = `${process.env.DATABASE_URL}/auths/urls`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${process.env.API_KEY}`,
      },
    });

    if (!response.ok) {
      throw new Error(
        `${ErrorMessage.UnknownError} - ${response.status} - ${response.statusText}`
      );
    }

    const { data } = await response.json();

    if (!data) {
      throw new Error(ErrorMessage.NoUserFound);
    }

    res.status(200).json({ url: data[AuthType.Google] });
  } catch (e) {
    const error = e as Error;

    res
      .status(500)
      .json({ message: `${ErrorMessage.UnknownError} - ${error.message}` });
  }
}
