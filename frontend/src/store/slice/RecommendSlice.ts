// 추천 관련입니다
import { createSlice } from "@reduxjs/toolkit";

export interface TripItemType {
  [key: string]: string;
}
export interface StudyItemType {
  [key: string]: string;
}
export interface MusicItemType {
  [key: string]: string;
}
export interface EatItemType {
  [key: string]: string;
}
export interface SportItemType {
  [key: string]: string;
}
export interface RecommendsState {
  recommends:
    | TripItemType[]
    | StudyItemType[]
    | EatItemType[]
    | MusicItemType[]
    | SportItemType[]
    | [];
}

const initialState: RecommendsState = {
  recommends: [],
};

const recommendSlice = createSlice({
  name: "recommend",
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
