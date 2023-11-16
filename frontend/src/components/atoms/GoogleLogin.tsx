import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import { loginsuccess, logout, setUserData } from "../../store/slice/AuthSlice";
import "./Google.css";
import { setTodosRedux } from "../../store/slice/calendar/TodoSlice";
import { setEvents } from "../../store/slice/calendar/CalendarSlice";

export default function GoogleLogin() {
  // 기본 세팅
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [memberId, setMemberId] = useState(localStorage.getItem("memberId"));

  const backend = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

  // 로그인버튼 클릭시
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
      // 멤버 아이디 저장
      localStorage.setItem("memberId", response.data.data.memberId);
      setMemberId(response.data.data.memberId);
      // 에세스 및 리프레시 토큰 저장
      localStorage.setItem("access_token", response.data.data.accessToken);
      localStorage.setItem("refresh_token", response.data.data.refreshToken);
      navigate("/");
    },
    onError: (errorResponse) => {
      console.error(errorResponse);
    },
    flow: "auth-code",
  });

  // 로그아웃버튼 클릭시
  const googleSocialLogout = async () => {
    console.log("로그아웃");
    dispatch(logout());
    dispatch(setEvents([]));
    dispatch(setTodosRedux([]));
    localStorage.removeItem("memberId");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setMemberId(localStorage.getItem("memberId"));
    navigate("/demo");
  };

  return (
    <>
      {!memberId ? (
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
      ) : (
        <>
          <button className="googleLogin" onClick={googleSocialLogout}>
            로그아웃
          </button>
        </>
      )}
    </>
  );
}
