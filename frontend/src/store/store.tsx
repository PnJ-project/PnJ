// store/store.tsx
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slice/CounterSlice";
import stringReducer from "./slice/StringSlice";
import listReducer from "./slice/ListSlice";
import authReducer from "./slice/AuthSlice";
import vitoReducer from "./slice/SoundSlice";
import toggleReducer from "./slice/ToggleSlice";

const rootReducer = combineReducers({
  counter: counterReducer,
  string: stringReducer,
  list: listReducer,
  auth: authReducer,
  vito: vitoReducer,
  toggle: toggleReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
