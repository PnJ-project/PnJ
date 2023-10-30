import React, {useState } from "react";
import  BigCalendar from "react-big-calendar";
import moment from "moment";
// import { Dialog, TextField, Button } from "@mui/material";
// import { TimePicker } from "@mui/lab";
import "react-big-calendar/lib/css/react-big-calendar.css";

BigCalendar.momentLocalizer(moment);

interface Event {
  title: string;
  start: Date;
  end: Date;
  desc?: string;
}

const Calendar: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [title, setTitle] = useState<string>("");
  const [start, setStart] = useState<Date>(new Date());
  const [end, setEnd] = useState<Date>(new Date());
  const [desc, setDesc] = useState<string>("");
  const [openSlot, setOpenSlot] = useState<boolean>(false);
  const [openEvent, setOpenEvent] = useState<boolean>(false);
  const [clickedEvent, setClickedEvent] = useState<Event | undefined>(undefined);

  const handleClose = () => {
    setOpenEvent(false);
    setOpenSlot(false);
  };

  const handleSlotSelected = (slotInfo: { start: Date, end: Date }) => {
    setStart(slotInfo.start);
    setEnd(slotInfo.end);
    setTitle("");
    setDesc("");
    setOpenSlot(true);
  };

  const handleEventSelected = (event: Event) => {
    setStart(event.start);
    setEnd(event.end);
    setTitle(event.title);
    setDesc(event.desc || "");
    setClickedEvent(event);
    setOpenEvent(true);
  };

  const setNewAppointment = () => {
    const appointment: Event = { title, start, end, desc };
    setEvents([...events, appointment]);
    handleClose();
  };

  const updateEvent = () => {
    if (clickedEvent) {
      const updatedEvents: Event[] = events.map((event) =>
        event === clickedEvent ? { ...event, title, desc, start, end } : event
      );
      setEvents(updatedEvents);
    }
    handleClose();
  };

  const deleteEvent = () => {
    if (start && events) {
      const updatedEvents: Event[] = events.filter((event) => event.start !== start);
      setEvents(updatedEvents);
    }
    handleClose();
  };

  const appointmentActions = [
    <button key="cancel" onClick={handleClose}>
      Cancel
    </button>,
    <button
      key="submit"
      color="primary"
      onClick={() => {
        setNewAppointment();
      }}
    >
      Submit
    </button>
  ];

  const eventActions = [
    <button key="cancel" color="secondary" onClick={handleClose}>
      Cancel
    </button>,
    <button
      key="delete"
      color="secondary"
      onClick={() => {
        deleteEvent();
      }}
    >
      Delete
    </button>,
    <button
      key="confirm"
      color="primary"
      onClick={() => {
        updateEvent();
      }}
    >
      Confirm Edit
    </button>
  ];

  return (
    <div>
      <BigCalendar
        events={events}
        views={["month", "week", "day", "agenda"]}
        timeslots={2}
        defaultView="month"
        defaultDate={new Date()}
        selectable={true}
        // onSelectEvent={(event: Event) => handleEventSelected(event)}
        // onSelectSlot={(slotInfo: { start: Date, end: Date }) => handleSlotSelected(slotInfo)}
      />

      {/* <Dialog
        title={`Book an appointment on ${moment(start).format("MMMM Do YYYY")}`}
        actions={appointmentActions}
        modal={false}
        open={openSlot}
        onRequestClose={handleClose}
      >
        <TextField
          floatingLabelText="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          floatingLabelText="Description"
          onChange={(e) => setDesc(e.target.value)}
        />

      </Dialog>

      <Dialog
        title={`View/Edit Appointment of ${moment(start).format("MMMM Do YYYY")}`}
        actions={eventActions}
        modal={false}
        open={openEvent}
        onRequestClose={handleClose}
      >
        <TextField
          defaultValue={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <br />
        <TextField
          defaultValue={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

      </Dialog> */}
    </div>
  );
};

export default Calendar;
