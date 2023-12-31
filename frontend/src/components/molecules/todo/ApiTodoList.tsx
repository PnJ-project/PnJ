// API캘린더용 투두 리스트입니다
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import TodoForm from "./ApiTodoForm";
import Todo from "./ApiTodo";
import { readTodo } from "../../../api/TodoApi";
import { useDispatch } from "react-redux";
import {
  TodoItems,
  addTodoRedux,
  removeTodoRedux,
  setTodosRedux,
  updateTodoRedux,
} from "../../../store/slice/calendar/TodoSlice";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";
import axiosInstance from "../../../functions/AxiosInstance";

// 타입
interface TodoItem {
  id: number;
  summary: string;
}
export interface ReqTodoCreate {
  memberId: number | null;
  summary: string;
}

// 백엔드
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

export default function TodoList() {
  // 기본세팅
  const dispatch = useDispatch();
  const reduxtodo = useSelector(TodoItems);
  const [todos, setTodos] = useState<TodoItem[]>(reduxtodo);
  const [memberId] = useState(Number(localStorage.getItem("memberId")));
  const { data: todoData, refetch: refetchTodo } = useQuery(
    "todoData",
    readTodo,
    {
      enabled: false,
      retry: false,
    }
  ); // todo API

  // 추가
  const addTodo = async (todo: { id: number; summary: string }) => {
    // 빈 일정 추가 불가시
    if (!todo.summary || /^\s*$/.test(todo.summary)) {
      return;
    }
    // 새로운 일정 폼 생성
    const newTodo: TodoItem = {
      id: todo.id,
      summary: todo.summary,
    };
    const reqNewTodo: ReqTodoCreate = {
      memberId: memberId,
      summary: todo.summary,
    };
    // 새로운 일정 적용 (개발자용)
    dispatch(addTodoRedux(newTodo));

    // 투두 생성 API 호출
    await setAuthorizationHeaderInter();
    try {
      await axiosInstance.post(`${local_back_url}/api/todo`, reqNewTodo);
      // 투두 다시 불러오기
      console.log("투두 생성 API 요청 완료");
      await refetchTodo();
    } catch (error) {
      console.error("투두 생성 API 에러:", error);
    }
  };

  // 업데이트
  const updateTodo = async (todoId: number, newValue: string) => {
    // 빈 값일시
    if (!newValue || /^\s*$/.test(newValue)) {
      return;
    }
    // 업데이트 적용(개발자용)
    dispatch(updateTodoRedux({ id: todoId, summary: newValue }));
    // 업데이트 요청
    await setAuthorizationHeaderInter();
    try {
      await axiosInstance.put(`${local_back_url}/api/todo`, {
        memberId: memberId,
        todoId: todoId,
        summary: newValue,
      });
      // 투두 다시 불러오기
      console.log("투두 수정 API 완료");
      await refetchTodo();
    } catch (error) {
      console.error("투두 수정 API 에러:", error);
    }
  };

  // 제거
  const removeTodo = async (id: number) => {
    // 삭제 적용(개발자용)
    dispatch(removeTodoRedux(id));
    // 삭제 API요청
    await setAuthorizationHeaderInter();
    try {
      const res = await axiosInstance.delete(
        `${local_back_url}/api/todo/${memberId}/${id}`
      );
      // 투두 다시 불러오기
      console.log(
        "투두 삭제 API 완료",
        `${local_back_url}/api/todo/${memberId}/${id}`,
        res
      );
      await refetchTodo();
    } catch (error) {
      console.error("투두 삭제 에러:", error);
    }
  };

  // 전역관리
  useEffect(() => {
    if (todoData && todoData.data) {
      console.log("투두 데이터가 갱신됩니다", todoData.data);
      setTodos(todoData.data);
      dispatch(setTodosRedux(todoData.data));
    }
  }, [todoData, dispatch]);

  // 최초 로딩시
  useEffect(() => {
    refetchTodo();
  }, []);

  // 리덕스 useState로 반영하기
  useEffect(() => {
    setTodos(reduxtodo);
  }, [reduxtodo]);

  return (
    <>
      <div className="TodoHeader">
        <div className="todoTitle"> 할일목록</div>
        <TodoForm onSubmit={addTodo} />
      </div>
      <div className="TodoBody">
        <Todo todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
      </div>
    </>
  );
}
