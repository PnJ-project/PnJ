import { useQuery, useMutation } from "react-query";
import axios from "axios";

// 로그인
export const useLogInPnJ = () => {
  return useMutation(async (code) => {
    const response = await axios.get(
      `${process.env.API_URL}/api/login?code=${code}`
    );
    return response.data;
  });
};

// 로그아웃
export const useLogOut = () => {
  return useQuery("logout", async () => {
    const { data } = await axios.get(`${process.env.API_URL}/Sample`);
    return data;
  });
};

// 토큰 리프레시
export const useTokenRefresh = () => {
  return useQuery("refresh", async () => {
    const { data } = await axios.get(`${process.env.API_URL}/Sample`);
    return data;
  });
};

// 내정보 불러오기
export const useFetchMyInfo = () => {
  return useQuery("myinfo", async () => {
    const { data } = await axios.get(`${process.env.API_URL}/Sample`);
    return data;
  });
};
