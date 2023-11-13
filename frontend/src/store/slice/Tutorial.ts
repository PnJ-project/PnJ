// 튜토리얼 관련입니다
import { createSlice } from "@reduxjs/toolkit";

interface TutorialState {
  isTutorial: boolean;
  indexTutorial: number;
}

const initialState: TutorialState = {
  isTutorial: false,
  indexTutorial: 1,
};

const tutorialSlice = createSlice({
  name: "tutorial",
  initialState,
  reducers: {
    setTutorialStart: (state) => {
      state.isTutorial = true;
    },
    setTutorialEnd: (state) => {
      state.isTutorial = false;
      state.indexTutorial = 100;
    },
    setAfterTutorial: (state) => {
      state.indexTutorial += 1;
    },
    setBeforeTutorial: (state) => {
      state.indexTutorial -= 1;
    },
  },
});

export const {
  setTutorialStart,
  setTutorialEnd,
  setAfterTutorial,
  setBeforeTutorial,
} = tutorialSlice.actions;
export const selectIsTutorial = (state: { tutorial: TutorialState }) =>
  state.tutorial.isTutorial;
export default tutorialSlice.reducer;
