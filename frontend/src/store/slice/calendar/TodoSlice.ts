import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoItem {
  id: number;
  summary: string;
}

interface TodoState {
  draggedTodo: { id: number; summary: string } | null;
  todos: TodoItem[];
}

const initialState: TodoState = {
  draggedTodo: null,
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodoRedux: (state, action: PayloadAction<TodoItem>) => {
      state.todos.push(action.payload);
    },
    updateTodoRedux: (
      state,
      action: PayloadAction<{ id: number; summary: string }>
    ) => {
      const { id, summary } = action.payload;
      const todoToUpdate = state.todos.find((todo) => todo.id === id);
      if (todoToUpdate) {
        todoToUpdate.summary = summary;
      }
    },
    removeTodoRedux: (state, action: PayloadAction<number>) => {
      console.log("투두 리덕스 삭제", action.payload, state.todos);
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    setTodosRedux: (state, action: PayloadAction<TodoItem[]>) => {
      state.todos = action.payload;
    },
    setDraggedTodo: (
      state,
      action: PayloadAction<{ id: number; summary: string } | null>
    ) => {
      state.draggedTodo = action.payload;
    },
  },
});

export const {
  addTodoRedux,
  updateTodoRedux,
  removeTodoRedux,
  setTodosRedux,
  setDraggedTodo,
} = todoSlice.actions;
export default todoSlice.reducer;
export const TodoItems = (state: { todo: TodoState }) => state.todo.todos;
export const selectDraggedTodo = (state: { todo: TodoState }) =>
  state.todo.draggedTodo;
