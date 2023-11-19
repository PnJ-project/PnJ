import { setAuthorizationHeaderInter } from "../functions/BaseFunc";
import axiosInstance from "../functions/AxiosInstance";

const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
// const service_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

interface RecommendRequest {
  timeMax: string;
  timeMin: string;
}

// J솔루션 리스트 불러오기
export const readRecommend = async ({ timeMax, timeMin }: RecommendRequest) => {
  await setAuthorizationHeaderInter();
  const response = await axiosInstance.get(
    `${local_back_url}/api/suggestion/${timeMax}/${timeMin}`
  );
  return response.data;
};
