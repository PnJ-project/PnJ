// 추천용 API
import { setAuthorizationHeaderInter } from "../functions/BaseFunc";
import axiosInstance from "../functions/AxiosInstance";

// 백엔드
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;

// 타입
interface RecommendRequest {
  memberId: string;
  timeMax: string;
  timeMin: string;
}

// J솔루션 리스트 불러오기
export const readRecommend = async ({
  memberId,
  timeMax,
  timeMin,
}: RecommendRequest) => {
  await setAuthorizationHeaderInter();
  const response = await axiosInstance.get(
    `${local_back_url}/api/suggestion/${memberId}/${timeMax}/${timeMin}`
  );
  return response.data;
};
