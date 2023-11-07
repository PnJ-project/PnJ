import axios from "axios";

// const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

// 구글 캘린더 정보 불러오기
export const readCalendar = async (timeMax: string, timeMin: string) => {
  const memberId = localStorage.getItem("memberId");
  const response = await axios.get(
    `${local_back_url}/api/calendar/${memberId}/${timeMin}/${timeMax}`
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
  const response = await axios.post(`${local_back_url}/api/calendar`, formdata);
  console.log(response);
  return response.data;
};

// 구글 캘린더 정보 수정하기
export const updateCalendar = async (formdata: EventData) => {
  const response = await axios.put(`${local_back_url}/api/calendar`, formdata);
  return response.data;
};

// 구글 캘린더 정보 삭제하기
export const deleteCalendar = async (eventId: number) => {
  const memberId = localStorage.getItem("memberId");
  const response = await axios.delete(
    `${local_back_url}/api/calendar/${memberId}/${eventId}`
  );
  return response.data;
};
