// EventForm.tsx

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEvent,
  deleteEvent,
} from "../../store/slice/calendar/CalendarSlice";
import { closeSideModal } from "../../store/slice/calendar/ModalSlice";
import { RootState } from "../../store/store";
import styled, { keyframes } from "styled-components";
import axios from "axios";
import { QueryObserverResult, RefetchOptions } from "react-query";
// import { Event as BigCalendarEvent } from "react-big-calendar";

// 모달 타입
interface ModalProps {
  id: number | string | unknown;
  refetchCal: <TPageData>(
    options?: RefetchOptions | undefined
  ) => Promise<QueryObserverResult<TPageData, unknown>>;
}
// 백엔드
// const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

const EventForm: React.FC<ModalProps> = ({ id, refetchCal }) => {
  // 기본 세팅
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.calendar.events);
  const event = events.find((event) => event.id === id);
  const [title, setTitle] = useState(event?.title);
  const [memo, setMemo] = useState(event?.memo);
  const [errorMsg, setErrorMsg] = useState("");
  const [sTime, setSTime] = useState("00:00");
  const [eTime, setETime] = useState("00:00");
  const [memberId] = useState(Number(localStorage.getItem("memberId")));
  console.log("zz", events);

  // 이벤트 수정
  const handleUpdateEvent = async () => {
    // 조건 만족안할시 반환
    if (typeof id != "number" || !event) {
      return;
    }
    if (!title) {
      setErrorMsg("일정 내용을 입력하세요");
      return;
    }
    const updateItem = {
      id: id,
      title,
      start: event.start.toString(),
      end: event.end.toString(),
      memo,
      resource: { event: { id: id, memo: memo } },
    };
    // 일정수정 (개발자용)
    dispatch(updateEvent(updateItem));
    // 캘린더 업데이트 API 요청
    const reqNewEvent = {
      memberId: memberId,
      event: {
        id: null,
        summary: title,
        colorId: null,
        start: {
          dateTime: "",
          timeZone: "Asia/Seoul",
          date: null,
        },
        end: {
          dateTime: "",
          timeZone: "Asia/Seoul",
          date: null,
        },
      },
    };
    try {
      await axios.post(`${local_back_url}/api/calendar`, reqNewEvent);
      // 캘린더 다시 불러오기
      console.log("구글 캘린더 생성 완료");
      await refetchCal();
    } catch (error) {
      console.error("구글 캘린더 생성 에러:", error);
      setErrorMsg("서버와 연결할 수 없습니다. 다시 시도해주세요");
      return;
    }
    // 원복
    dispatch(closeSideModal());
    setTitle("");
    setMemo("");
  };

  // 이벤트 삭제
  const handleDeleteEvent = async () => {
    // 삭제할거냐는 메세지 띄우기
    // 일정삭제 (개발자용)
    if (typeof id == "number") {
      dispatch(deleteEvent(id));
    }
    // 캘린더 삭제 API 요청
    try {
      const res = await axios.delete(
        `${local_back_url}/api/calendar/${memberId}/${id}`
      );
      // 투두 다시 불러오기
      console.log(
        "캘린더 삭제 완료",
        `${local_back_url}/api/calendar/${memberId}/${id}`,
        res
      );
      await refetchCal();
    } catch (error) {
      console.error("캘린더 삭제 에러:", error);
    }
  };

  return (
    <Overlay
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dispatch(closeSideModal());
        }
      }}
    >
      <InputModalContainer>
        <CloseBtn
          onClick={() => {
            dispatch(closeSideModal());
          }}
        >
          ✖
        </CloseBtn>
        <Title>일정 수정하기</Title>
        <div>시간</div>
        <SelectDate>
          <input
            type="time"
            value={sTime}
            step="6000"
            onChange={(e) => {
              setSTime(e.target.value);
            }}
          />
          <input
            type="time"
            value={eTime}
            step="600"
            onChange={(e) => setETime(e.target.value)}
          />
        </SelectDate>
        <div>일정</div>
        <input
          type="text"
          placeholder="일정을 입력하세요"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value) {
              setErrorMsg("");
            }
          }}
        />
        <div>메모</div>
        <input
          type="text"
          placeholder="메모를 남기세요"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
        />
        <ErrorMsg>{errorMsg}</ErrorMsg>
        <div>
          <button onClick={handleDeleteEvent}>일정 삭제</button>
          <button onClick={handleUpdateEvent}>일정 변경</button>
        </div>
      </InputModalContainer>
    </Overlay>
  );
};

export default EventForm;
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CloseBtn = styled.div`
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 24px;
  margin: 10px;
`;
const ErrorMsg = styled.div`
  font-size: 12px;
  margin: 10px;
  color: #a73131;
`;
const SelectDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  input {
    width: 30% !important;
    height: 20px !important;
    margin: unset !important;
    margin-bottom: 20px !important;
  }
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

const InputModalContainer = styled.div`
  animation: ${fadeIn} 0.2s ease-in;
  font-family: HSSaemaul-Regular;
  position: fixed;
  padding: 20px;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  z-index: 150;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 7px;
  box-shadow: 5px 5px 20px #525252, -5px -5px 20px #525252;
  overflow: hidden;
  transition: 0.3s ease-out;
  input {
    padding: 5px;
    width: 80%;
    margin: 0px 5px 10px 5px;
    border: 1px solid #9f9a9a;
    border-radius: 5px;
    font-family: insungitCutelivelyjisu;
  }
  input:nth-of-type(1) {
  }
  input:nth-of-type(2) {
    height: 100px;
  }
  button {
    margin-top: 10px;
    background-color: #515151;
    color: #eee;
  }
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
