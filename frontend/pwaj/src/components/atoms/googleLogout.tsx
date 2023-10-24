import { signOut } from "next-auth/react";

// import React from 'react';
export default function googleLogin() {
  return (
    <>
      <button onClick={() => signOut()}>로그아웃</button>
    </>
  );
}
