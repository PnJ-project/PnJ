// import React from 'react';
import { useNavigate } from "react-router-dom";
export default function Calendar() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Calendar</h1>
      <button onClick={() => navigate("/demo")}>go to demo</button>
    </>
  );
}
