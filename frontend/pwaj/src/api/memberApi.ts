import axios, { AxiosResponse } from "axios";

// 로그인
export interface LoginResponse {
  message: string;
  data: {
    memberId: number;
    memberEmail: string;
  };
}
export const LogInPnJ = async (code: string | string[]) => {
  try {
    const response: LoginResponse = await axios.get(
      `http://70.12.247.132:8080/api/login?code=${code}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 로그아웃

// 토큰 리프레시

// 회원가입

// 회원탈퇴

// 내정보 불러오기
