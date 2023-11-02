import GoogleLogin from "../atoms/GoogleLogin";
import PnjLogo from "../atoms/PnjLogo";
import "./Navbar.css";

// import React from 'react';
export default function Navbar() {
  return (
    <>
      <div className="DemoNavbar">
        <div className="InputContaier">
          <PnjLogo />
        </div>
        <div className="NavGoogleBtn">
          <GoogleLogin />
        </div>
      </div>
    </>
  );
}
