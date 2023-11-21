// 팀소개 버튼
import { useNavigate } from "react-router-dom";

export default function TeamBtn() {
  // 기본 세팅
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
