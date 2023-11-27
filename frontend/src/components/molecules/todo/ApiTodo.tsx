// API캘린더용 투두 아이템입니다
import React, { useState } from "react";
import { RiCloseCircleLine } from "react-icons/ri";
import { TiEdit } from "react-icons/ti";
import { useDispatch } from "react-redux";
import { setDraggedTodo } from "../../../store/slice/calendar/TodoSlice";

// 타입
interface TodoProps {
  todos: { id: number; summary: string }[];
  removeTodo: (id: number) => void;
  updateTodo: (id: number, newValue: string) => void;
}

const Todo: React.FC<TodoProps> = ({ todos, removeTodo, updateTodo }) => {
  // 기본세팅
  const dispatch = useDispatch();
  const [edit, setEdit] = useState<{ id: number | null; value: string }>({
    id: null,
    value: "",
  });

  // 업데이트 등록
  const submitUpdate = (updatedTodo: { id: number; summary: string }) => {
    if (edit.id) {
      updateTodo(edit.id, updatedTodo.summary);
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

  //drag
  const handleDragStart = (id: number, summary: string) => {
    dispatch(setDraggedTodo({ id, summary }));
  };

  return (
    <>
      <div className="todoBox">
        {todos.map((todo, index) => (
          <div
            className={"todo-row"}
            key={index}
            draggable="true"
            onDragStart={() => handleDragStart(todo.id, todo.summary)}
          >
            {!edit.id || edit.id != todo.id ? (
              <div className="shTodo" key={todo.id}>
                {todo.summary}
              </div>
            ) : (
              <input
                className="todoItemInput"
                type="text"
                value={edit.value}
                onChange={handleUpdateValue}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey && edit.id) {
                    submitUpdate({ id: edit.id, summary: edit.value });
                  }
                }}
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
