// 추천 관련입니다
import { createSlice } from "@reduxjs/toolkit";

export interface RecommendState {
  category: string;
}
interface RecommendsState {
  recommends: RecommendState[];
}

const initialState: RecommendsState = {
  recommends: [],
};

const recommendSlice = createSlice({
  name: "recommendSlice",
  initialState,
  reducers: {
    setRecommend: (state, actions) => {
      state.recommends = actions.payload;
    },
  },
});

export const { setRecommend } = recommendSlice.actions;
export const selectRecommends = (state: { recommend: RecommendsState }) =>
  state.recommend.recommends;
export default recommendSlice.reducer;
