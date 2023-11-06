// 데모 - 메인 기능 캘린더 컴포넌트
// import React from 'react';
import { useState } from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { fetchStt } from "../../api/SttApi";
import { readCalendar } from "../../api/CalendarApi";
import { readTodo } from "../../api/TodoApi";
import TextareaAutosize from "react-textarea-autosize";
import PnjLogo from "../atoms/PnjLogo";
import GoogleLogin from "../atoms/GoogleLogin";
import TodoList from "../molecules/TodoList";
import SmallCal from "../../pages/test/SmallCal";
import BigCalendar from "../../pages/test/BigCalendar";
import DemoMadal from "../molecules/FlaskMadal";
import Mike from "/image/mike.svg";
import Paste from "/image/paste.svg";
import "./DemoCalendar.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  openDemoModal,
  selectIsDemoModalOpen,
} from "../../store/slice/calendar/ModalSlice";
import { RootState } from "../../store/store";
import { Event, addEvent } from "../../store/slice/calendar/CalendarSlice";

export interface FlaskResType {
  end: {
    dateTime: string;
    timeZome: string;
  };
  start: {
    dateTime: string;
    timeZome: string;
  };
  summary: string;
}

export default function DemoCalendar() {
  // 기본 세팅
  const dispatch = useDispatch();
  const [textSave, setTextSave] = useState(""); // 인풋박스 값
  const [afterFlask, setAfterFlask] = useState<FlaskResType[]>([]); // 인풋박스 값
  const [freetime, setFreeTime] = useState(3); // 무료이용 가능횟수
  const isDemoOpen = useSelector(selectIsDemoModalOpen);
  const events = useSelector((state: RootState) => state.calendar.events);
  const [timeMax] = useState(moment().startOf("month").toDate().toISOString());
  const [timeMin] = useState(
    moment().endOf("month").endOf("week").toDate().toISOString()
  );
  const { error: sttError, refetch: refetchStt } = useQuery(
    "sttData",
    fetchStt,
    { enabled: false, retry: false }
  ); // stt API
  const { refetch: refetchCal } = useQuery(
    "calendarData",
    () => readCalendar(timeMax, timeMin),
    { enabled: false, retry: false }
  ); // calendar API
  const { refetch: refetchTodo } = useQuery("todoData", readTodo, {
    enabled: false,
    retry: false,
  }); // todo API

  // 붙여넣기
  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setTextSave(text);
    });
  };

  // 인풋필드 변경시 저장
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextSave(event.target.value);
  };

  // 음성녹음
  const handleRecord = async () => {
    // API 요청
    console.log("음성시도");
    await refetchStt();
    if (sttError) {
      return;
    }
    // 투두 + 캘린더 리패치
    refetchCal();
    refetchTodo();
  };

  // 제출하기
  const flask = import.meta.env.VITE_APP_FLASK_SERVER;
  const handleSubmit = async () => {
    // 무료이용 가능횟수 제한
    if (!freetime) {
      setTextSave("로그인후 자유롭게 이용해보세요. ");
      return;
    }
    // 빈값일시 반환
    if (textSave.trim() === "") {
      console.log("빈값 반환");
      return;
    }
    setFreeTime(freetime - 1);

    // 모달창 오픈
    dispatch(openDemoModal());
    // 플라스크 api 연결
    const formData = new FormData();
    formData.append("input", textSave);
    // formData.append("input", textSave);
    try {
      console.log("플라스크 전송");
      const response = await axios.post(`${flask}/trans/date`, formData);
      // const response2 = {
      //   data: {
      //     end: { dateTime: "2023-11-15T16:02:11", timeZome: "Asia/Seoul" },
      //     start: { dateTime: "2023-11-15T15:02:11", timeZome: "Asia/Seoul" },
      //     summary: "저녁약속",
      //   },
      // };
      // 전달 데이터
      console.log("플라스크 반환", response);
      setAfterFlask(response.data);
      for (const dataItem of response.data) {
        // 리덕스 반영 (개발자용)
        if (dataItem.end.dateTime == null) {
          // 1. 투두
        } else {
          // 2. 캘린더
          const newEvent: Event = {
            id: events.length,
            title: dataItem.summary,
            start: dataItem.start.dateTime,
            end: dataItem.end.dateTime,
            memo: "",
          };
          // 일정생성 (개발자용)
          dispatch(addEvent(newEvent));
        }
      }
      // 데이터 리패치
      await refetchTodo();
      await refetchCal();
      return response;
    } catch (error) {
      console.error("Error flask data:", error);
    }

    // 인풋 필드 리셋
    setTextSave("");
  };

  // 인풋 필드에서 엔터 키 입력 시 제출
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 엔터 키의 기본 동작 방지
      handleSubmit();
    }
  };

  return (
    <>
      <div className="MainContainer">
        {/* Nav Bar */}
        <div className="DemoNavbar">
          <div className="InputContaier">
            <PnjLogo />
            <TextareaAutosize
              className="PnjInput"
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="일정을 입력해보세요"
              value={textSave}
            />
            <img src={Mike} className="mikeImg" onClick={handleRecord} />
            <img src={Paste} className="pasteImg" onClick={handlePaste} />
            <button className="submitBtn" onClick={handleSubmit}>
              등록
            </button>
            <div className="FreeTxt">
              <div>횟수제한 : </div>
              <div className={`${freetime === 0 ? "NotFree" : ""}`}>
                {freetime}
              </div>
            </div>
          </div>
          <div className="NavGoogleBtn">
            <GoogleLogin />
          </div>
        </div>
        {/* Body */}
        <div className="CalendarContainer">
          {/* 왼쪽 사이드 - 작은캘린더 / 투두리스트 */}
          <div className="LeftSideContainer">
            <div className="SmallCalendar">
              <SmallCal />
            </div>
            <div className="Todo-Container">
              <TodoList />
            </div>
          </div>
          {/* 오른쪽 사이드 - 큰 캘린더 */}
          <div className="RightSideContainer">
            <div className="Calendar">
              <BigCalendar />
            </div>
          </div>
        </div>
      </div>
      {/* 기타 */}
      {isDemoOpen && <DemoMadal before={textSave} after={afterFlask} />}
    </>
  );
}
