// store/store.tsx
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/CounterSlice";
import stringReducer from "./slice/StringSlice";
import listReducer from "./slice/ListSlice";
import authReducer from "./slice/AuthSlice";
import calendarReducer from './slice/CalendarSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  string: stringReducer,
  list: listReducer,
  auth: authReducer,
  calendar: calendarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
