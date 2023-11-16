// calendarSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Event {
  id: number;
  title: string;
  allDay?: boolean;
  start: string;
  end: string;
  memo?: string;
  colorId?: number;
}
export interface UpdateEvent {
  title: string | undefined;
  allDay?: boolean;
  start: string | undefined;
  end: string | undefined;
  memo?: string;
  colorId?: number;
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
      console.log(action.payload);
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
        state.events[index].memo = action.payload.memo ?  action.payload.memo:action.payload.resource.event.memo;
        state.events[index].colorId = action.payload.colorId ?  action.payload.colorId:action.payload.resource.event.colorId;
        state.events[index].title = action.payload.title?.toString();
      }
    },
    deleteEvent: (state, action: PayloadAction<number | string>) => {
      state.events = state.events.filter(
        (event) => event.id !== action.payload
      );
    },
    apiUpdateEvent: (state, action) => {
      const index = state.events.findIndex(
        (event) => event.id === action.payload.before
      );
      if (index !== -1) {
        state.events[index] = action.payload.after;
      }
    },
  },
});

export const { setEvents, addEvent, updateEvent, deleteEvent, apiUpdateEvent } = calendarSlice.actions;
export const selectEvents = (state: { calendar: CalendarState }) => state.calendar.events;
export default calendarSlice.reducer;
