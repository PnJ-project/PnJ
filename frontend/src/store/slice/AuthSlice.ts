// 회원관리 관련입니다
import { createSlice } from "@reduxjs/toolkit";

interface infoState {}
interface LogState {
  isLoggedIn: boolean;
  info: infoState;
}

const initialState: LogState = {
  isLoggedIn: false,
  info: {},
};

const authSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    loginsuccess: (state) => {
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { loginsuccess, logout } = authSlice.actions;
export default authSlice.reducer;
