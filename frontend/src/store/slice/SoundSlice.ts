// 음성녹음 관련입니다
import { createSlice } from "@reduxjs/toolkit";

interface SoundState {
  access_token: string;
}

const initialState: SoundState = {
  access_token: "",
};

const vitoSlice = createSlice({
  name: "sound",
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
