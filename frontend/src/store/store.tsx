// store/store.tsx
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/AuthSlice";
import calendarReducer from "./slice/calendar/CalendarSlice";
import modalReducer from "./slice/calendar/ModalSlice";
import handleReducer from "./slice/calendar/HandleSlice";
import todoReducer from "./slice/calendar/TodoSlice";
import tutorialReducer from "./slice/Tutorial";
import vitoReducer from "./slice/SoundSlice";
import toggleReducer from "./slice/ToggleSlice";
import recommendReducer from "./slice/RecommendSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  vito: vitoReducer,
  toggle: toggleReducer,
  calendar: calendarReducer,
  modal: modalReducer,
  handledate: handleReducer,
  todo: todoReducer,
  tutorial: tutorialReducer,
  recommend: recommendReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
