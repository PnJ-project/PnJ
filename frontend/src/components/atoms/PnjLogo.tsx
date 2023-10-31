// import React from 'react';
import { Link } from "react-router-dom";
import pnjLogo from "/image/pnjLogo.svg";

export default function PnjLogo() {
  return (
    <>
      <Link to={`/demo`}>
        <img src={pnjLogo} alt="Logo" style={{ marginRight: "10px" }} />
      </Link>
    </>
  );
}
