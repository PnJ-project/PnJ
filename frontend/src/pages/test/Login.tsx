import GoogleLogin from "../../components/atoms/GoogleLogin";
import GoogleLogout from "../../components/atoms/GoogleLogout";

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
