import React, { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";
import "./Todo.css";

interface TodoItem {
  id: number;
  text: string;
  isComplete: boolean;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  // 추가
  const addTodo = (todo: { id: number; text: string }) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }
    const newTodo: TodoItem = {
      id: todo.id,
      text: todo.text,
      isComplete: false, // 기본적으로 완료되지 않은 상태로 추가됨
    };

    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    console.log(...todos);
  };
  // 업데이트
  const updateTodo = (todoId: number, newValue: string) => {
    if (!newValue || /^\s*$/.test(newValue)) {
      return;
    }
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todoId ? { ...item, text: newValue } : item
      )
    );
  };
  // 제거
  const removeTodo = (id: number) => {
    const removedArr = todos.filter((todo) => todo.id !== id);
    setTodos(removedArr);
  };

  return (
    <>
      <div className="todoTitle"> 할일목록</div>
      <TodoForm onSubmit={addTodo} />
      <div>
        {todos.length != 0 ? (
          <>
            <hr />
          </>
        ) : (
          <>
            <div style={{ margin: "10px" }}></div>
          </>
        )}
      </div>
      <Todo todos={todos} removeTodo={removeTodo} updateTodo={updateTodo} />
    </>
  );
};

export default TodoList;
