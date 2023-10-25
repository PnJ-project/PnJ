import GoogleLogin from "@/components/atoms/googleLogin";
import GoogleLogout from "@/components/atoms/googleLogout";
import { useEffect } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

// import React from 'react';
export default function Login() {
  const { data: session, status } = useSession();
  console.log(session, status);
  useEffect(() => {}, []);
  return (
    <>
      <h1>login & logout</h1>
      <GoogleLogin />
      <GoogleLogout />
    </>
  );
}
