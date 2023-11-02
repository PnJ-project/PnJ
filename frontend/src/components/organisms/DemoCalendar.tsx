// 데모 - 메인 기능 캘린더 컴포넌트
// import React from 'react';
import { useState } from "react";
import moment from "moment";
import { useQuery } from "react-query";
import { fetchStt } from "../../api/SttApi";
import { EventData, addCalendar, readCalendar } from "../../api/CalendarApi";
import { readTodo } from "../../api/TodoApi";
import TextareaAutosize from "react-textarea-autosize";
import PnjLogo from "../atoms/PnjLogo";
import GoogleLogin from "../atoms/GoogleLogin";
import TodoList from "../molecules/TodoList";
import SmallCal from "../../pages/test/SmallCal";
import BigCalendar from "../../pages/test/BigCalendar";
import Mike from "/image/mike.svg";
import Paste from "/image/paste.svg";
import "./DemoCalendar.css";
import axios from "axios";

export default function DemoCalendar() {
  // 기본 세팅
  const [textSave, setTextSave] = useState(""); // 인풋박스 값
  const [timeMax] = useState(moment().startOf("month").toDate().toISOString());
  const [timeMin] = useState(
    moment().endOf("month").endOf("week").toDate().toISOString()
  );
  const changes: EventData[] = [];
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
    // 빈값일시 반환
    if (textSave.trim() === "") {
      console.log("빈값 반환");
      return;
    }
    console.log("플라스크 가자");

    try {
      const data = await axios.post(`${flask}/trans/date`, {
        input: textSave,
      });
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error flask data:", error);
    }

    // 플라스크 api 연결
    try {
      console.log("플라스크 가자");
      const data = await axios.post(
        `${import.meta.env.VITE_APP_FLASK_SERVER}/trans/date`,
        { input: textSave }
      );
      console.log(data);
      return data;
      // 임시 데이터에 넣어주기
      // 1. 투두

      // 2. 캘린더
    } catch (error) {
      console.error("Error flask data:", error);
    }

    // 등록 API 요청
    for (let i = 0; i < changes.length; i++) {
      const formdata = changes[i];
      await addCalendar(formdata);
    }

    // 투두 갱신
    await refetchTodo();

    // 캘린더 갱신
    await refetchCal();

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
    </>
  );
}
