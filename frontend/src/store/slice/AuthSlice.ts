// 회원관리 관련입니다
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface infoState {
  memberId: number | null;
  memberEmail: string;
  accessToken: string;
  refreshToken: string;
}
interface LogState {
  isLoggedIn: boolean;
  data: infoState;
}

const initialState: LogState = {
  isLoggedIn: false,
  data: {
    memberId: null,
    memberEmail: "",
    accessToken: "",
    refreshToken: "",
  },
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
      state.data = {
        memberId: null,
        memberEmail: "",
        accessToken: "",
        refreshToken: "",
      };
    },
    setUserData: (state, action: PayloadAction<infoState>) => {
      state.data = action.payload;
    },
  },
});

export const { loginsuccess, logout, setUserData } = authSlice.actions;
export const selectIsLogin = (state: { auth: LogState }) =>
  state.auth.isLoggedIn;
export const selectMemberId = (state: { auth: LogState }) =>
  state.auth.data.memberId;
export const selectAccessToken = (state: { auth: LogState }) =>
  state.auth.data.accessToken;
export default authSlice.reducer;
