// 회원관리 관련입니다
import { createSlice } from "@reduxjs/toolkit";

interface LogState {
  access_token: string;
}

const initialState: LogState = {
  access_token: "",
};

const vitoSlice = createSlice({
  name: "vitoKeyFetch",
  initialState,
  reducers: {
    fetchVitoKey: (state, actions) => {
      state.access_token = actions.payload;
    },
    resetSoundKey: (state) => {
      state.access_token = "";
    },
  },
});

export const { fetchVitoKey, resetSoundKey } = vitoSlice.actions;
export default vitoSlice.reducer;
