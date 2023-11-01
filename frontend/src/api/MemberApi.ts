import axios from "axios";

const local_back_url = process.env.BACKEND_SERVER;
// const service_back_url = process.env.BACKEND_SERVER_LIVE;

// 로그인
export const logInPnJ = async (code: string) => {
  const response = await axios.get(`${local_back_url}/api/login?code=${code}`);
  return response.data;
};

// 로그아웃
export const logOut = async () => {
  const response = await axios.get(`${local_back_url}/Sample`);
  return response.data;
};

// 토큰 리프레시
export const tokenRefresh = async () => {
  const response = await axios.get(`${local_back_url}/Sample`);
  return response.data;
};

// 내정보 불러오기
export const useFetchMyInfo = async () => {
  const response = await axios.get(`${local_back_url}/Sample`);
  return response.data;
};
