import { useEffect, useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./Todo.css";
import { useDispatch } from "react-redux";
import {
  TodoItems,
  addTodoRedux,
  removeTodoRedux,
  updateTodoRedux,
} from "../../store/slice/calendar/TodoSlice";
import { useSelector } from "react-redux";

interface TodoItem {
  id: number;
  summary: string;
}

export default function TodoList() {
  // 기본세팅
  const dispatch = useDispatch();
  const reduxtodo = useSelector(TodoItems);
  const [todos, setTodos] = useState<TodoItem[]>(reduxtodo);

  // 추가
  const addTodo = async (todo: { id: number; summary: string }) => {
    // 빈 일정 추가 불가시
    if (!todo.summary || /^\s*$/.test(todo.summary)) {
      return;
    }
    // 새로운 일정 폼 생성
    console.log(todo.id, "zzzzzzzzzzzz");
    const newTodo: TodoItem = {
      id: todo.id,
      summary: todo.summary,
    };
    // 새로운 일정 적용 (개발자용)
    dispatch(addTodoRedux(newTodo));
  };

  // 업데이트
  const updateTodo = async (todoId: number, newValue: string) => {
    // 빈 값일시
    if (!newValue || /^\s*$/.test(newValue)) {
      return;
    }
    // 업데이트 적용(개발자용)
    dispatch(updateTodoRedux({ id: todoId, summary: newValue }));
  };

  // 제거
  const removeTodo = async (id: number) => {
    // 삭제 적용(개발자용)
    dispatch(removeTodoRedux(id));
  };

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
