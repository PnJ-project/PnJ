// 서비스 소개 버튼
import { useNavigate } from "react-router-dom";

export default function ServiceBtn() {
  // 기본 세팅
  const navigate = useNavigate();
  return (
    <>
      <button
        className="googleLogin"
        onClick={() => {
          navigate("/about");
        }}
      >
        서비스 소개
      </button>
    </>
  );
}
