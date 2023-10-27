// import React from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleLogin() {
    const googleSocialLogin = useGoogleLogin({
        // scope : 환경 변수 파일로 받아오는게 좋을 것 같습니다
        scope: "email profile https://www.googleapis.com/auth/calendar",
        onSuccess: async ({ code }) => {
          // 로그인 완료 시 액세스 토큰 받기 위한 code
          console.log(code);
          const tokens = await axios.get('http://localhost:8080/api/login' + '?code=' + `${code}`)
          // 미작성(현재 액)
          console.log(tokens.data);
        },
        onError: (errorResponse) => {
          console.error(errorResponse);
        },
        flow: "auth-code",
      });
  return (
      <>
          {/* TODO : 환경 변수 설정 */}
        <GoogleOAuthProvider clientId="303398331485-bi8j2vvltn2lk7ah62dhuo2qpgbqmp1j.apps.googleusercontent.com">
            <div onClick={googleSocialLogin}>Google Button</div>
        </GoogleOAuthProvider>      
    </>
  );
}