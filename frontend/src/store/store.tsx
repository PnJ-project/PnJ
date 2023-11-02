// store/store.tsx
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/sample/CounterSlice";
import stringReducer from "./slice/sample/StringSlice";
import listReducer from "./slice/sample/ListSlice";
import authReducer from "./slice/AuthSlice";
import calendarReducer from './slice/calendar/CalendarSlice';
import modalReducer from "./slice/calendar/ModalSlice";


const rootReducer = combineReducers({
  //sample용
  counter: counterReducer,
  string: stringReducer,
  list: listReducer,
  //실제 사용하는 slice
  auth: authReducer,
  calendar: calendarReducer,
  modal: modalReducer,

});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
