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

  const submitUpdate = (updatedTodo: { id: number; text: string }) => {
    if (edit.id) {
      updateTodo(edit.id, updatedTodo.text); // 여기서는 텍스트 부분만 업데이트
      setEdit({
        id: null,
        value: "",
      });
    }
  };

  const handleUpdateValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit({ ...edit, value: e.target.value });
  };

  // if (edit.id) {
  //   return <TodoForm edit={edit} onSubmit={submitUpdate} />;
  // }

  return (
    <>
      <div className="todoBox">
        {todos.map((todo, index) => (
          <div
            className={todo.isComplete ? "todo-row complete" : "todo-row"}
            key={index}
          >
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
              {!edit.id || edit.id != todo.id ? (
                <>
                  <TiEdit
                    onClick={() => setEdit({ id: todo.id, value: todo.text })}
                    className="edit-icon"
                  />
                </>
              ) : (
                <>
                  <TiEdit
                    onClick={() => {
                      console.log(edit.id, edit.value);
                      if (edit.id) {
                        submitUpdate({ id: edit.id, text: edit.value });
                      }
                      setEdit({ id: null, value: todo.text });
                    }}
                    className="edit-icon"
                  />
                </>
              )}
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
