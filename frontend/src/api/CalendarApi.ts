import { useQuery, useMutation } from "react-query";
import axios from "axios";

// 구글 캘린더 정보 불러오기
export const useReadCalendar = () => {
  return useQuery("calendar", async () => {
    const { data } = await axios.get(`${process.env.API_URL}/Sample`);
    return data;
  });
};

// 구글 캘린더 정보 생성하기
export const useAddCalendar = () => {
  return useMutation((dataToSend) =>
    axios.post(`${process.env.API_URL}/Sample`, dataToSend)
  );
};

// 구글 캘린더 정보 수정하기
export const useUpdateCalendar = () => {
  return useMutation((dataToSend) =>
    axios.put(`${process.env.API_URL}/Sample`, dataToSend)
  );
};

// 구글 캘린더 정보 삭제하기
export const useDeleteCalendar = () => {
  return useMutation(() => axios.delete(`${process.env.API_URL}/Sample`));
};
