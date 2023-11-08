// calendarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Event {
  id: number;
  title: string;
  allDay?: boolean;
  start: string;
  end: string;
  memo?: string;
}
export interface UpdateEvent {
  title: string | undefined;
  allDay?: boolean;
  start: string | undefined;
  end: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resource: { event: any };
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
      console.log(action.payload)
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<UpdateEvent>) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.resource.event.id
      );
      if (
        index !== -1 &&
        action.payload.end &&
        action.payload.start &&
        action.payload.title
      ) {
        state.events[index].id = action.payload.resource.event.id;
        state.events[index].allDay = action.payload.allDay;
        state.events[index].end = action.payload.end;
        state.events[index].start = action.payload.start;
        state.events[index].title = action.payload.title?.toString();
      }
    },
    deleteEvent: (state, action: PayloadAction<number>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
  },
});

export const { setEvents, addEvent, updateEvent, deleteEvent } = calendarSlice.actions;
export const selectEvents = (state: { calendar: CalendarState }) => state.calendar.events;
export default calendarSlice.reducer;
