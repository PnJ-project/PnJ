// 데모캘린더용 투두 생성폼입니다
import React, { useState, useEffect, useRef } from "react";

// 타입
interface TodoFormProps {
  edit?: { id: number | null; value: string };
  onSubmit: (todo: { id: number; summary: string }) => void; // 수정된 부분
}

const TodoForm: React.FC<TodoFormProps> = (props) => {
  // 기본세팅
  const [input, setInput] = useState(props.edit ? props.edit.value : "");
  const inputRef = useRef<HTMLInputElement>(null);

  // 초기세팅
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // 입력값 변경시
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 값 제출시
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input) {
      props.onSubmit({
        id: Math.floor(Math.random() * 1000000000000000000000000) - 0.01,
        summary: input,
      });
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="todo-form">
      {props.edit ? (
        <>
          <input
            placeholder="Update your item"
            value={input}
            onChange={handleChange}
            name="text"
            ref={inputRef}
            className="todo-input edit"
          />
          <button onClick={handleSubmit} className="todo-button edit">
            Update
          </button>
        </>
      ) : (
        <>
          <input
            placeholder="Add a todo"
            value={input}
            onChange={handleChange}
            name="text"
            className="todo-input"
            ref={inputRef}
          />
          <button onClick={handleSubmit} className="todo-button">
            +
          </button>
        </>
      )}
    </form>
  );
};

export default TodoForm;
