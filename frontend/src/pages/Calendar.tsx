import React, { ChangeEvent } from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Dialog, TextField, Button } from "@mui/material";
import { Moment } from "moment";

import "react-big-calendar/lib/css/react-big-calendar.css";
// import "./Calendar.css"; // 적절한 CSS 파일을 import하여 스타일을 적용할 수 있습니다.

BigCalendar.momentLocalizer(moment);

interface MyEvent {
  title: string;
  start: Date;
  end: Date;
  desc: string;
  color?: string;
  className?: string;
}

interface State {
  events: MyEvent[];
  title: string;
  start: Date;
  end: Date;
  desc: string;
  openSlot: boolean;
  openEvent: boolean;
  clickedEvent: MyEvent;
}

class Calendar extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = {
      events: [],
      title: "",
      start: new Date(),
      end: new Date(),
      desc: "",
      openSlot: false,
      openEvent: false,
      clickedEvent: {} as MyEvent,
    };
  }

  handleClose = () => {
    this.setState({ openEvent: false, openSlot: false });
  };

  handleSlotSelected = (slotInfo: { start: Date; end: Date }) => {
    this.setState({
      title: "",
      desc: "",
      start: slotInfo.start,
      end: slotInfo.end,
      openSlot: true,
    });
  };

  handleEventSelected = (event: MyEvent) => {
    this.setState({
      openEvent: true,
      clickedEvent: event,
      start: event.start,
      end: event.end,
      title: event.title,
      desc: event.desc,
    });
  };

  setTitle = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ title: e.target.value });
  };

  setDescription = (e: ChangeEvent<HTMLInputElement>) => {
    this.setState({ desc: e.target.value });
  };

  handleStartTime = (date: Moment | null) => {
    if (date) {
      this.setState({ start: date.toDate() });
    }
  };

  handleEndTime = (date: Moment | null) => {
    if (date) {
      this.setState({ end: date.toDate() });
    }
  };

  setNewAppointment = () => {
    const { start, end, title, desc } = this.state;
    const appointment: MyEvent = { title, start, end, desc } as MyEvent;
    const events: MyEvent[] = [...this.state.events, appointment];
    this.setState({ events });
  };

  updateEvent = () => {
    const { title, desc, start, end, events, clickedEvent } = this.state;
    const updatedEvents = events.map((event) =>
      event === clickedEvent ? { ...event, title, desc, start, end } : event
    );
    this.setState({ events: updatedEvents });
  };

  deleteEvent = () => {
    const { start, events } = this.state;
    const updatedEvents = events.filter((event) => event.start !== start);
    this.setState({ events: updatedEvents });
  };

  render() {
    const { events, openSlot, openEvent } = this.state;

    return (
      <div id="Calendar">
        <BigCalendar
          events={events}
          views={["month", "week", "day", "agenda"]}
          timeslots={2}
          defaultView="month"
          defaultDate={new Date()}
          selectable={true}
          onSelectEvent={this.handleEventSelected}
          onSelectSlot={this.handleSlotSelected}
        />

        <Dialog
          title={`Book an appointment on ${moment(this.state.start).format(
            "MMMM Do YYYY"
          )}`}
          open={openSlot}
          onClose={this.handleClose}
        >
          <TextField
            label="Title"
            onChange={this.setTitle}
          />
          <br />
          <TextField
            label="Description"
            onChange={this.setDescription}
          />
          <Button onClick={this.setNewAppointment}>Submit</Button>
        </Dialog>

        <Dialog
          title={`View/Edit Appointment of ${moment(this.state.start).format(
            "MMMM Do YYYY"
          )}`}
          open={openEvent}
          onClose={this.handleClose}
        >
          <TextField
            label="Title"
            defaultValue={this.state.title}
            onChange={this.setTitle}
          />
          <br />
          <TextField
            label="Description"
            defaultValue={this.state.desc}
            onChange={this.setDescription}
          />
          <Button onClick={this.deleteEvent} color="secondary">
            Delete
          </Button>
          <Button onClick={this.updateEvent} color="primary">
            Confirm Edit
          </Button>
        </Dialog>
      </div>
    );
  }
}

export default Calendar;
