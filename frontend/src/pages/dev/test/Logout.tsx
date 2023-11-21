import GoogleLogout from "../../../components/atoms/GoogleLogout";
import { useEffect } from "react";
import LoadingBtn from "../../../components/atoms/LoadingBtn";

// import React from 'react';
export default function Logout() {
  useEffect(() => {});
  return (
    <>
      <h1>login</h1>
      <GoogleLogout />
      <LoadingBtn />
    </>
  );
}
