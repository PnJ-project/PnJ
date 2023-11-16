// 인터셉터를 통해 리프레시 토큰 검증하는 파일입니다.

import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BACKEND_SERVER, // 디폴트 백엔드 URL
});

// 리프레시한 엑세스 토큰을 헤더에 싣는 작업
const setAuthorizationHeader = (token: string): void => {
  axiosInstance.defaults.headers.common["Authorization"] = `${token}`;
};
// 저장된 리프레시 토큰을 가져오는 함수
const getRefreshTokenFromLocalStorage = (): string | null => {
  return localStorage.getItem("refresh_token");
};

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config!;

    // 액세스 토큰 만료 시에만 리프레시 토큰 사용
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (error.response?.status === 401 && !originalRequest._retry) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      originalRequest._retry = false;
      try {
        const refreshToken = getRefreshTokenFromLocalStorage();
        axiosInstance.defaults.headers.common["refreshToken"] = `${
          refreshToken as string
        }`;

        const response: AxiosResponse<{
          data: { accessToken: string; refreshToken: string };
        }> = await axiosInstance.get("api/login/token/refresh"); // 만료 토큰 갱신

        const newAccessToken = response.data.data.accessToken;
        const newRefreshToken = response.data.data.refreshToken;
        setAuthorizationHeader(newAccessToken);

        originalRequest.headers["Authorization"] = `${newAccessToken}`;

        // 로컬스토리지에 재발급한 토큰 저장
        localStorage.setItem("access_token", newAccessToken);
        localStorage.setItem("refresh_token", newRefreshToken);

        return axiosInstance(originalRequest);
      } catch (error) {
        console.log(error);
        throw error;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
