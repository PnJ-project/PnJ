import axios from "axios";

const local_back_url = process.env.BACKEND_SERVER;
// const service_back_url = process.env.BACKEND_SERVER_LIVE;

// 구글 캘린더 정보 불러오기
export const readCalendar = async () => {
  const response = await axios.get(`${local_back_url}/Sample`);
  return response.data;
};

// 구글 캘린더 정보 생성하기
export const addCalendar = async (formdata: string) => {
  const response = await axios.post(`${local_back_url}/Sample`, formdata);
  return response.data;
};

// 구글 캘린더 정보 수정하기
export const updateCalendar = async (formdata: string) => {
  const response = await axios.post(`${local_back_url}/Sample`, formdata);
  return response.data;
};

// 구글 캘린더 정보 삭제하기
export const useDeleteCalendar = async () => {
  const response = await axios.delete(`${local_back_url}/Sample`);
  return response.data;
};
