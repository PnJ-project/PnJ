// 회원관리 관련입니다
import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface infoState {
  memberId: number | null;
  memberEmail: string;
}
interface LogState {
  isLoggedIn: boolean;
  data: infoState;
}

const initialState: LogState = {
  isLoggedIn: false,
  data: {
    memberId: null,
    memberEmail: '',
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
    },
    setUserData: (state, action: PayloadAction<infoState>) => {
      state.data = action.payload;
    }
  },
});

export const { loginsuccess, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
