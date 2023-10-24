import { signIn } from "next-auth/react";

// import React from 'react';
export default function googleLogin() {
  return (
    <>
      <button onClick={() => signIn("google")}>구글 로그인</button>
    </>
  );
}
