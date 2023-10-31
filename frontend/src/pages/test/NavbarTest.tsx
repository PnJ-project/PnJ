import GoogleLogin from "../../components/atoms/GoogleLogin";
import PnjLogo from "../../components/atoms/PnjLogo";
import "../../components/molecules/Navbar.css";

// import React from 'react';
export default function NavbarTest() {
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
