import axios from "axios";
import axiosInstance from "./AxiosInstance";

// 시간을 한국 시간대로 변경
export default function formatDateTime(inputDate: Date): string {
  const year = inputDate.getFullYear();
  const month = (inputDate.getMonth() + 1).toString().padStart(2, "0");
  const day = inputDate.getDate().toString().padStart(2, "0");
  const hours = inputDate.getHours().toString().padStart(2, "0");
  const minutes = inputDate.getMinutes().toString().padStart(2, "0");
  const seconds = inputDate.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

  return formattedDateTime;
}

// Header에 토큰 싣기
export const setAuthorizationHeader = () => {
  const accessToken = localStorage.getItem("access_token");
  axios.defaults.headers.common["Authorization"] = `${accessToken as string}`;
};
// instance - Header에 토큰 싣기
export const setAuthorizationHeaderInter = () => {
  const accessToken = localStorage.getItem("access_token");
  axiosInstance.defaults.headers.common["Authorization"] = `${
    accessToken as string
  }`;
};

// 이미지 URL을 HTTPS로 변경하는 함수
export const convertToHttps = (url: string) => {
  if (url && url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }
  return url;
};
