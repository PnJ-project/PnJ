import axios from "axios";
import { setAuthorizationHeader } from "../functions/BaseFunc";

// const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

export interface TodoListType {
  data: TodoType[];
}
export interface TodoType {
  id: number;
  summary: string;
}

// 할일목록 정보 불러오기
export const readTodo = async () => {
  await setAuthorizationHeader();
  const memberId = localStorage.getItem("memberId");
  const response = await axios.get(`${local_back_url}/api/todo/${memberId}`);
  return response.data;
};

// 할일목록 정보 생성하기
export const addTodo = async (formdata: TodoType) => {
  await setAuthorizationHeader();
  const response = await axios.post(`${local_back_url}/api/todo`, formdata);
  return response.data;
};

// 할일목록 정보 수정하기
export const updateTodo = async (formdata: TodoType) => {
  await setAuthorizationHeader();
  const response = await axios.put(`${local_back_url}/api/todo`, formdata);
  return response.data;
};

// 할일목록 정보 삭제하기
export const deleteTodo = async (todoId: number) => {
  await setAuthorizationHeader();
  const memberId = localStorage.getItem("memberId");
  const response = await axios.delete(
    `${local_back_url}/api/todo/${memberId}/${todoId}`
  );
  return response.data;
};
