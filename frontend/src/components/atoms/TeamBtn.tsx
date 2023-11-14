import { useNavigate } from "react-router-dom";

export default function TeamBtn() {
  const navigate = useNavigate();
  return (
    <>
      <button
        className="googleLogin"
        onClick={() => {
          navigate("/team");
        }}
      >
        팀 소개
      </button>
    </>
  );
}
