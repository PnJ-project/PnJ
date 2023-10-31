// import React from 'react';
import { Link } from "react-router-dom";
import pnjLogo from "/image/pnjLogo.svg";
import { setDemoFalse } from "../../store/slice/ToggleSlice";
import { useDispatch } from "react-redux";

export default function PnjLogo() {
  // 기본세팅
  const dispatch = useDispatch();
  return (
    <>
      <Link
        to={`/demo`}
        onClick={() => {
          dispatch(setDemoFalse());
        }}
      >
        <img src={pnjLogo} alt="Logo" style={{ marginRight: "10px" }} />
      </Link>
    </>
  );
}
