// 토글 관련입니다
import { createSlice } from "@reduxjs/toolkit";

interface ToggleState {
  isUseDemo: boolean;
  isFlashModal: boolean;
  isRecommend: boolean;
}

const initialState: ToggleState = {
  isUseDemo: false,
  isFlashModal: false,
  isRecommend: false,
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
    setRecommendTrue: (state) => {
      state.isRecommend = true;
    },
    setRecommendFalse: (state) => {
      state.isRecommend = false;
    },
  },
});

export const {
  setDemoTrue,
  setDemoFalse,
  setFlashModalTrue,
  setFlashModalFalse,
  setRecommendTrue,
  setRecommendFalse,
} = toggleSlice.actions;
export const selectIsDemo = (state: { toggle: ToggleState }) =>
  state.toggle.isUseDemo;
export const selectIsRecommend = (state: { toggle: ToggleState }) =>
  state.toggle.isRecommend;
export default toggleSlice.reducer;
