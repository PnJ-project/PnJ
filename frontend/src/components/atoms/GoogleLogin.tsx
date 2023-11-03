import { useDispatch } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import "./Google.css";
import axios from "axios";
import { loginsuccess, setUserData } from "../../store/slice/AuthSlice";

export default function GoogleLogin() {
  // 기본 세팅
  const dispatch = useDispatch();
  const backend = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;
  const googleSocialLogin = useGoogleLogin({
    // scope : 환경 변수 파일로 받아오는게 좋을 것 같습니다
    scope: "email profile https://www.googleapis.com/auth/calendar",
    onSuccess: async ({ code }) => {
      // 로그인 완료 시 액세스 토큰 받기 위한 code
      console.log(code);
      const response = await axios.get(
        `${backend}/api/login` + "?code=" + `${code}`
      );
      // 정보 전역 저장
      console.log(response.data);
      dispatch(loginsuccess());
      dispatch(setUserData(response.data.data));
      // Save memberId to local storage
      localStorage.setItem("memberId", response.data.data.memberId);
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });
  return (
    <>
      <button className="googleLogin" onClick={googleSocialLogin}>
        <img
          src="/image/googlelogo.png"
          alt="Google Logo"
          width={20}
          height={20}
          style={{ marginRight: "10px" }}
        />
        <div>Google Login</div>
      </button>
    </>
  );
}
