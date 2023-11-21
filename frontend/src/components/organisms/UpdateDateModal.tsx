// EventForm.tsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Event, addEvent } from "../../store/slice/calendar/CalendarSlice";
import { closeModal } from "../../store/slice/calendar/ModalSlice";
import { RootState } from "../../store/store";
import styled from "styled-components";

interface ModalProps {
  selectedRange: { start: Date; end: Date };
}

const EventForm: React.FC<ModalProps> = ({ selectedRange }) => {
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.calendar.events);
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");

  const handleAddEvent = () => {
    const newEvent: Event = {
      id: events.length,
      title,
      start: selectedRange.start.toISOString(),
      end: selectedRange.end.toISOString(),
      memo,
    };

    dispatch(addEvent(newEvent));
    setTitle("");
    dispatch(closeModal());
  };

  return (
    <InputModalContainer>
      <input
        type="text"
        placeholder="Event Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Event Memo"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <button onClick={handleAddEvent}>Add Event</button>
    </InputModalContainer>
  );
};

export default EventForm;

const InputModalContainer = styled.div`
  position: fixed;
  top: 24%;
  left: 38%;
  width: 400px;
  z-index: 150;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 7px;
  box-shadow: 5px 5px 30px #aaa;
  overflow: hidden;
  transition: 0.3s ease-out;
  .inputModalHead {
    display: flex;
    width: 100%;
    height: 40px;
    background-color: #eee;
    border-top-right-radius: 7px;
    border-top-left-radius: 7px;
    justify-content: end;
    .modalClose {
      margin-right: 5px;
      border: none;
      font-weight: bolder;
      border-top-right-radius: 7px;
      color: #a1a1a1;
      cursor: pointer;
      &:hover {
        color: black;
      }
    }
  }
  .changeDate {
    width: 90%;
    height: 10%;
    display: flex;
    justify-content: space-evenly;
    .setDate {
      width: 170px;
      border: none;
      border-radius: 7px;
      background-color: white;
      &:hover {
        background-color: #eee;
      }
      &:active {
        background-color: rgba(49, 116, 173);
        color: white;
      }
    }
  }
  .inputModalBody {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    .inputTitle {
      margin-top: 4px;
      width: 90%;
      height: 40px;
      border: none;
      border-bottom: 1px solid #ccc;
      font-size: 20px;
      &::placeholder {
        font-size: 20px;
      }
      &:focus {
        outline: none;
        border-bottom: 3px solid rgba(49, 116, 173);
        transition: 0.1s ease-in;
      }
    }
    .inputCalendar {
      position: absolute;
      top: 9rem;
      transition: ease-in 0.2s;
      overflow: hidden;
      border-radius: 6px;
      box-shadow: 0px 0px 20px #ccc;
    }
    .inputTextArea {
      width: 90%;
      height: 70%;
      border: 1px solid #ccc;
      border-radius: 7px;
      resize: none;
      font-size: 15px;
      padding: 5px 0 0 5px;
      &:focus {
        outline: none;
        border: 1px solid rgba(49, 116, 173);
        transition: 0.8s ease-in;
      }
    }
  }
  .inputModalFooter {
    width: 95%;
    height: 13%;
    border-bottom-right-radius: 7px;
    border-bottom-left-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .modalSubmit {
      width: 80px;
      height: 40px;
      border-radius: 5px;
      border: none;
      background-color: rgba(49, 116, 173);
      color: white;
      margin-right: 10px;
    }
    .checkAllDayBox {
      display: flex;
      justify-content: center;
      align-items: center;

      .allDayCheckBox {
        appearance: none;
        width: 1rem;
        height: 1rem;
        border: 2px solid rgba(49, 116, 173);
        border-radius: 0.35rem;

        &:checked {
          background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
          background-size: 100% 100%;
          background-color: rgba(49, 116, 173);
        }
      }
      .allDayLabel {
        display: flex;
        align-items: center;
        user-select: none;
        font-size: 13px;
      }
    }
  }
`;
