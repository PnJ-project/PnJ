import { useDispatch } from 'react-redux';
import { useGoogleLogin } from "@react-oauth/google";
import "./Google.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../../store/slice/AuthSlice'

export default function GoogleLogin() {
  // 기본 세팅
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const backend = import.meta.env.VITE_APP_BACKEND_URL;
  const googleSocialLogin = useGoogleLogin({
    // scope : 환경 변수 파일로 받아오는게 좋을 것 같습니다
    scope: "email profile https://www.googleapis.com/auth/calendar",
    onSuccess: async ({ code }) => {
      // 로그인 완료 시 액세스 토큰 받기 위한 code
      console.log(code);
      const response = await axios.get(
        `http://${backend}:8080/api/login` + "?code=" + `${code}`
      );
      // 미작성(현재 액)
      console.log(response.data);
      dispatch(setUserData(response.data.data));
      navigate('/')
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
        <div>Continue with Google</div>
      </button>
    </>
  );
}
