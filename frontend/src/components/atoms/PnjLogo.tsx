// import React from 'react';
import pnjLogo from "/image/pnjLogoWhite.svg";
import { setDemoFalse } from "../../store/slice/ToggleSlice";
import { useDispatch } from "react-redux";

export default function PnjLogo() {
  // 기본세팅
  const dispatch = useDispatch();
  return (
    <>
      <div
        onClick={() => {
          dispatch(setDemoFalse());
        }}
      >
        <img
          src={pnjLogo}
          alt="Logo"
          style={{ marginRight: "30px", cursor: "pointer" }}
        />
      </div>
    </>
  );
}
