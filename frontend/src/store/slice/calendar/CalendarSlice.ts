// calendarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Event {
  id: number;
  title: string;
  allday?: boolean;
  start: string;
  end: string; 
  memo?: string;
}

interface CalendarState {
  events: Event[];
}

const initialState: CalendarState = {
  events: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex((event) => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter((event) => event.id !== action.payload);
    },
  },
});

export const { setEvents, addEvent, updateEvent, deleteEvent } = calendarSlice.actions;
export const selectEvents = (state: { calendar: CalendarState }) => state.calendar.events;
export default calendarSlice.reducer;
