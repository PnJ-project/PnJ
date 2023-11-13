import { useNavigate } from "react-router-dom";

export default function ServiceBtn() {
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
