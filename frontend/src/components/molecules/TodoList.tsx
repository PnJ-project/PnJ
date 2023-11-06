import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./Todo.css";
import { readTodo } from "../../api/TodoApi";
import axios from "axios";
import { useDispatch } from "react-redux";
import { TodoItems, setTodosRedux } from "../../store/slice/calendar/TodoSlice";
import { useSelector } from "react-redux";

interface TodoItem {
  id: number;
  summary: string;
}
interface ReqTodoCreate {
  memberId: number | null;
  summary: string;
}
// const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
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
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);

    // 투두 생성 API 호출
    try {
      await axios.post(`${local_back_url}/api/todo`, reqNewTodo);
      // 투두 다시 불러오기
      console.log("생성 완료");
      await refetchTodo();
    } catch (error) {
      console.error("투두 생성 에러:", error);
    }
  };

  // 업데이트
  const updateTodo = async (todoId: number, newValue: string) => {
    // 빈 값일시
    if (!newValue || /^\s*$/.test(newValue)) {
      return;
    }
    // 업데이트 적용(개발자용)
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todoId ? { ...item, summary: newValue } : item
      )
    );
    // 업데이트 요청
    try {
      await axios.put(`${local_back_url}/api/todo`, {
        memberId: memberId,
        todoId: todoId,
        summary: newValue,
      });
      // 투두 다시 불러오기
      console.log("수정 완료");
      await refetchTodo();
    } catch (error) {
      console.error("투두 업데이트 에러:", error);
    }
  };

  // 제거
  const removeTodo = async (id: number) => {
    // 삭제 적용(개발자용)
    const removedArr = todos.filter((todo) => todo.id !== id);
    setTodos(removedArr);
    // 삭제 API요청
    try {
      const res = await axios.delete(
        `${local_back_url}/api/todo/${memberId}/${id}`
      );
      // 투두 다시 불러오기
      console.log(
        "삭제 완료",
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
    console.log("todo 갱신", todoData);
    if (todoData && todoData.data) {
      console.log("todo 리덕스");
      // console.log("투두바뀜",firstTodo);
      setTodos(todoData.data);
      dispatch(setTodosRedux(todoData.data));
    }
  }, [todoData, dispatch]);

  // 최초 로딩시
  useEffect(() => {
    refetchTodo();

    console.log("todo 불러오기");
  }, []);

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
