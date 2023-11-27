// 투두용 API
import { setAuthorizationHeaderInter } from "../functions/BaseFunc";
import axiosInstance from "../functions/AxiosInstance";

// 백엔드
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

// 타입
export interface TodoListType {
  data: TodoType[];
}
export interface TodoType {
  id: number;
  summary: string;
}

// 할일목록 정보 불러오기
export const readTodo = async () => {
  await setAuthorizationHeaderInter();
  const memberId = localStorage.getItem("memberId");
  const response = await axiosInstance.get(
    `${local_back_url}/api/todo/${memberId}`
  );
  return response.data;
};
