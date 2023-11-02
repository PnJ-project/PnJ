// 회원관리 관련입니다
import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  isUseDemo: boolean;
  isFlashModal: boolean;
}

const initialState: ToggleState = {
  isUseDemo: false,
  isFlashModal: false,
};

const toggleSlice = createSlice({
  name: "log",
  initialState,
  reducers: {
    setDemoTrue: (state) => {
      state.isUseDemo = true;
    },
    setDemoFalse: (state) => {
      state.isUseDemo = false;
    },
    setFlashModalTrue: (state) => {
      state.isFlashModal = true;
    },
    setFlashModalFalse: (state) => {
      state.isFlashModal = false;
    },
  },
});

export const {
  setDemoTrue,
  setDemoFalse,
  setFlashModalTrue,
  setFlashModalFalse,
} = toggleSlice.actions;
export default toggleSlice.reducer;
