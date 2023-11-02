import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./Todo.css";
import { readTodo } from "../../api/TodoApi";
import { addTodo, updateTodo, removeTodo, setTodos } from "../../store/slice/TodoSlice";
import axios from "axios";
import { useDispatch } from "react-redux";

interface TodoItem {
  id: number;
  summary: string;
}
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
// const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

export default function TodoList() {
  // 기본세팅
  const dispatch = useDispatch();
  const [todos, setTodos] = useState<TodoItem[]>([]);
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
    // 새로운 일정 적용 (개발자용)
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    dispatch(addTodo(newTodo));
    // 투두 생성 API 호출
    try {
      await axios.post(`${local_back_url}/api/todo`, newTodo);
      // 투두 다시 불러오기
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
        id: todoId,
        summary: newValue,
      });
      // 투두 다시 불러오기
      await refetchTodo();
    } catch (error) {
      console.error("투두 업데이트 에러:", error);
    }
  };

  // 제거
  const removeTodo = (id: number) => {
    const removedArr = todos.filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  // 전역관리
  useEffect(() => {
    if (todoData) {
      console.log("투두바뀜");
      setTodos(todoData.data);
    }
  }, [todoData]);

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
