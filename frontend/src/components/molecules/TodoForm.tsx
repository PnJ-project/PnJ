import React, { useState, useEffect, useRef } from "react";

interface TodoFormProps {
  edit?: { id: number | null; value: string };
  onSubmit: (todo: { id: number; text: string }) => void; // 수정된 부분
}

const TodoForm: React.FC<TodoFormProps> = (props) => {
  const [input, setInput] = useState(props.edit ? props.edit.value : "");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (input) {
      props.onSubmit({
        id: Math.floor(Math.random() * 10000),
        text: input,
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
