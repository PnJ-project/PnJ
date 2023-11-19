import { setAuthorizationHeaderInter } from "../functions/BaseFunc";
import axiosInstance from "../functions/AxiosInstance";

// const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

// 구글 캘린더 정보 불러오기
export const readCalendar = async (timeMax: string, timeMin: string) => {
  await setAuthorizationHeaderInter();
  const response = await axiosInstance.get(
    `${local_back_url}/api/calendar/v2/${timeMin}/${timeMax}`
  );
  return response.data;
};

// 구글 캘린더 정보 생성하기
export interface EventStartEnd {
  dateTime: string;
  timeZone: string;
  date: null | string;
}
export interface EventData {
  memberId: number;
  event: {
    id: null | string;
    summary: string;
    colorId: number;
    start: EventStartEnd;
    end: EventStartEnd;
  };
}
export const addCalendar = async (formdata: EventData) => {
  await setAuthorizationHeaderInter();
  const response = await axiosInstance.post(
    `${local_back_url}/api/calendar/v2`,
    formdata
  );
  console.log(response);
  return response.data;
};

// 구글 캘린더 정보 수정하기
export const updateCalendar = async (formdata: EventData) => {
  await setAuthorizationHeaderInter();
  const response = await axiosInstance.put(
    `${local_back_url}/api/calendar/v2`,
    formdata
  );
  return response.data;
};

// 구글 캘린더 정보 삭제하기
export const deleteCalendar = async (eventId: number) => {
  await setAuthorizationHeaderInter();
  const response = await axiosInstance.delete(
    `${local_back_url}/api/calendar/v2/${eventId}`
  );
  return response.data;
};
