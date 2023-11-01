// src/store/calendarSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
}

interface CalendarState {
  events: Event[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
  },
});

export const { setEvents } = calendarSlice.actions;

export default calendarSlice.reducer;
