import axios from "axios";

const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
// const service_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

// 로그인
export const logInPnJ = async (code: string) => {
  const response = await axios.get(`${local_back_url}/api/login?code=${code}`);
  return response.data;
};
