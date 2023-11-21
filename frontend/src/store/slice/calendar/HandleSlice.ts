// 캘린더 - 변경관련 입니다

import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface HandleState {
  handledate: string;
  handleRangeDate: { rangeStart: string; rangeEnd: string };
}

const date = new Date().toISOString();
const initialState: HandleState = {
  handleRangeDate: { rangeStart: date, rangeEnd: date },
  handledate: date,
};

const handleSlice = createSlice({
  name: "handledate",
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.handledate = action.payload;
    },
    selectRangeDate: (
      state,
      action: PayloadAction<{ rangeStart: string; rangeEnd: string }>
    ) => {
      state.handleRangeDate = action.payload;
    },
  },
});

export const { change, selectRangeDate } = handleSlice.actions;
export const handleDate = (state: RootState) => state.handledate.handledate;
export const setSelectDate = (state: RootState) =>
  state.handledate.handleRangeDate;
export default handleSlice.reducer;
