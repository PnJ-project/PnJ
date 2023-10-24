import NextAuth from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID2;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET2;
if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Google client ID and client secret are required.");
}

const nextAuthOptions = (req: NextApiRequest, res: NextApiResponse) => {
  return {
    providers: [
      GoogleProvider({
        clientId: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
      }),
    ],
  };
};

const authHandler = (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, nextAuthOptions(req, res));
};

export default authHandler;
