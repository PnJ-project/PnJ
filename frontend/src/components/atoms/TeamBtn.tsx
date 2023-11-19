import { useNavigate } from "react-router-dom";

export default function TeamBtn() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="googleLogin marginBtn"
        onClick={() => {
          navigate("/team");
        }}
      >
        팀 소개
      </button>
    </>
  );
}
