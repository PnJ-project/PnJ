import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

interface TodoProps {
  todos: { id: number; text: string; isComplete: boolean }[];
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newValue: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todos, removeTodo, updateTodo }) => {
  const [edit, setEdit] = useState<{ id: number | null; value: string }>({
    id: null,
    value: "",
  });
  // 업데이트 등록
  const submitUpdate = (updatedTodo: { id: number; text: string }) => {
    if (edit.id) {
      updateTodo(edit.id, updatedTodo.text);
      setEdit({
        id: null,
        value: "",
      });
    }
  };
  // 아이템 값 변경
  const handleUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, value: e.target.value });
  };

  return (
    <>
      <div className="todoBox">
        {todos.map((todo, index) => (
          <div className={"todo-row"} key={index}>
            {!edit.id || edit.id != todo.id ? (
              <div className="todoItem" key={todo.id}>
                {todo.text}
              </div>
            ) : (
              <input
                className="todoItemInput"
                type="text"
                value={edit.value}
                onChange={handleUpdateValue}
              />
            )}

            <div className="icons">
              <TiEdit
                onClick={() => {
                  if (!edit.id || edit.id != todo.id) {
                    setEdit({ id: todo.id, value: todo.text });
                  } else {
                    if (edit.id) {
                      submitUpdate({ id: edit.id, text: edit.value });
                    }
                    setEdit({ id: null, value: todo.text });
                  }
                }}
                className="edit-icon"
              />

              {/* 삭제버튼 */}
              <RiCloseCircleLine
                onClick={() => removeTodo(todo.id)}
                className="delete-icon"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
