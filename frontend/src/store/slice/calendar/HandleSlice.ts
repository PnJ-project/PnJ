//HandleSlice.ts

import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface ModalState {
  handledate:string,
}

const date = new Date().toISOString()
const initialState: ModalState = {
  handledate: date,
};

const handleSlice = createSlice({
  name: 'handledate',
  initialState,
  reducers: {
    change: (state, action: PayloadAction<string>) => {
      state.handledate = action.payload
    }
  },
});

export const { change } = handleSlice.actions;
export const handleDate = (state: RootState) => state.handledate.handledate;
export default handleSlice.reducer;
