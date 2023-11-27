import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface StringState {
  value: string;
  flashModalMdg: string;
}

const initialState: StringState = {
  value: "",
  flashModalMdg: "",
};

const stringSlice = createSlice({
  name: "string",
  initialState,
  reducers: {
    updateString: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setFlashModalMdg: (state, action: PayloadAction<string>) => {
      state.flashModalMdg = action.payload;
    },
  },
});

export const { updateString, setFlashModalMdg } = stringSlice.actions;
export default stringSlice.reducer;
