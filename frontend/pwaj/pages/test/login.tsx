"use client";
import GoogleLogin from "@/components/atoms/googleLogin";
import GoogleLogout from "@/components/atoms/googleLogout";

// import React from 'react';
export default function Login() {
  return (
    <>
      <h1>login & logout</h1>
      <GoogleLogin />
      <GoogleLogout />
    </>
  );
}
