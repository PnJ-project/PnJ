// import React from 'react';
import { useEffect, useState } from "react";
import "./DemoCalendar.css";
import TextareaAutosize from "react-textarea-autosize";
export default function DemoCalendar() {
  // 기본 세팅
  const [textSave, setTextSave] = useState("");
  // 붙여넣기
  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      if (textSave) {
        setTextSave(textSave + text);
      }
    });
  };
  // 인풋필드 변경시 저장
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextSave(event.target.value);
  };

  useEffect(() => {}, []);

  return (
    <>
      <div className="MainContainer">
        {/* 인풋부 */}
        <div className="InputContaier">
          <div className="InputTitle">체험</div>
          <TextareaAutosize
            className="ExhibitionInput"
            onChange={handleInputChange}
            placeholder="일정을 입력해보세요"
          />
          <button>음성인식</button>
          <button onClick={handlePaste}>붙여넣기</button>
          <button>제출하기</button>
        </div>
        <div className="CalendarContainer">
          {/* 투두부 */}
          <div className="TodoContainer">
            <div>1</div>
            <div>2</div>
          </div>
          {/* 캘린더부 */}
          <div className="Calendar"></div>
        </div>
      </div>
    </>
  );
}
