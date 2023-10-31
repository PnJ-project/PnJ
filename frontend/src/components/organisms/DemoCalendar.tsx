// import React from 'react';
import { useEffect, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import TodoList from "../molecules/TodoList";
import PnjLogo from "../atoms/PnjLogo";
import Mike from "/image/mike.svg";
import Paste from "/image/paste.svg";
import "./DemoCalendar.css";
import GoogleLogin from "../atoms/GoogleLogin";

export default function DemoCalendar() {
  // 기본 세팅
  const [textSave, setTextSave] = useState("");

  // 붙여넣기
  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      console.log(text);
      setTextSave(text);
    });
  };
  // 인풋필드 변경시 저장
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextSave(event.target.value);
  };
  // 음성녹음
  const handleRecord = () => {};
  // 제출하기
  const handleSubmit = () => {
    // API 요청

    // 리셋
    setTextSave("");
  };

  useEffect(() => {}, []);

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
            <div className="SmallCalendar"></div>
            <div className="Todo-Container">
              <TodoList />
            </div>
          </div>
          {/* 오른쪽 사이드 - 큰 캘린더 */}
          <div className="RightSideContainer">
            <div className="Calendar"></div>
          </div>
        </div>
      </div>
    </>
  );
}
