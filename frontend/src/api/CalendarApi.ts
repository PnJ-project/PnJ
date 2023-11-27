// 캘린더용 API
import { setAuthorizationHeaderInter } from "../functions/BaseFunc";
import axiosInstance from "../functions/AxiosInstance";

// 백엔드
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

// 구글 캘린더 정보 불러오기
export const readCalendar = async (timeMax: string, timeMin: string) => {
  await setAuthorizationHeaderInter();
  const memberId = localStorage.getItem("memberId");
  const response = await axiosInstance.get(
    `${local_back_url}/api/calendar/v2/${memberId}/${timeMin}/${timeMax}`
  );
  return response.data;
};
