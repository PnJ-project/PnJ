import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import { LogInPnJ } from "@/api/memberApi";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Google client ID and client secret are required.");
}

const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        authorization: {
          params: {
            scope: "email profile https://www.googleapis.com/auth/calendar",
          },
        },
      }),
    ],
  };
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  const { query } = req;
  // 아래에 code에 대한 내용
  if (query.code) {
    console.log("Google login successful");
    // LogInPnJ(query.code);
  }

  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;
