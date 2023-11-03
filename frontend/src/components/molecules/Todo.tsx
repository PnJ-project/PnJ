// import React, { useCallback, useState } from "react";
import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";

interface TodoProps {
  todos: { id: number; summary: string }[];
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newValue: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todos, removeTodo, updateTodo }) => {
  // 기본세팅
  const [edit, setEdit] = useState<{ id: number | null; value: string }>({
    id: null,
    value: "",
  });
  // const [draggedEvent, setDraggedEvent] = useState()
  // const handleDragStart = useCallback((event) => setDraggedEvent(event), [])
  
  // 업데이트 등록
  const submitUpdate = (updatedTodo: { id: number; summary: string }) => {
    if (edit.id) {
      updateTodo(edit.id, updatedTodo.summary);
      console.log("바꿀녀석은", edit, updatedTodo);
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
              <div
                className="todoItem"
                key={todo.id}
                draggable="true"
                // onDragStart={() =>
                //   handleDragStart({ title: todo.id })
                // }
              >
                {todo.summary}
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
              {/* 수정버튼 */}
              <TiEdit
                onClick={() => {
                  // 수정 시도
                  if (!edit.id || edit.id != todo.id) {
                    setEdit({ id: todo.id, value: todo.summary });
                  } else {
                    // 수정 완료
                    if (edit.id) {
                      submitUpdate({ id: edit.id, summary: edit.value });
                    }
                    setEdit({ id: null, value: todo.summary });
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
