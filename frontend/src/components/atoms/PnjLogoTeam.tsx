import pnjLogo from "/image/pnjLogo.svg";
import { useNavigate } from "react-router-dom";

export default function PnjLogo() {
  // 기본세팅
  const navigate = useNavigate();
  return (
    <>
      <div
        onClick={() => {
          navigate("/");
        }}
      >
        <img
          src={pnjLogo}
          alt="Logo"
          style={{
            marginRight: "10px",
            position: "fixed",
            top: "30px",
            left: "30px",
            zIndex: "2",
            cursor: "pointer",
          }}
        />
      </div>
    </>
  );
}
