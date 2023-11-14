// 데모 - 메인 기능 캘린더 컴포넌트
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import PnjLogo from "../atoms/PnjLogo";
import GoogleLogin from "../atoms/GoogleLogin";
import DemoTutorialBox from "../atoms/DemoTutorialBox";
import TodoList from "../molecules/TodoList";
import DemoMadal from "../molecules/FlaskMadal";
import DemoTutorial from "../molecules/DemoTutorial";
import SmallCal from "../../pages/test/SmallCal";
import BigCalendar from "../../pages/test/BigCalendar";
import { IoMicCircle } from "react-icons/io5";
import Paste from "/image/paste.svg";
import {
  openDemoModal,
  selectIsDemoModalOpen,
} from "../../store/slice/calendar/ModalSlice";
import { RootState } from "../../store/store";
import { Event, addEvent } from "../../store/slice/calendar/CalendarSlice";
import { addTodoRedux } from "../../store/slice/calendar/TodoSlice";
import "./DemoCalendar.css";
//stt
import { useSpeechRecognition } from "react-speech-kit";
import { selectIsTutorial, setTutorialStart } from "../../store/slice/Tutorial";
import { AiFillQuestionCircle } from "react-icons/ai";
import About from "../../pages/service/About";

// 타입 선언
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
export interface TodoItem {
  id: number;
  summary: string;
}

export default function DemoCalendar() {
  // 기본 세팅
  const dispatch = useDispatch();
  // const { textsave, listening, toggleListening } = SpeechToText();
  const [textSave, setTextSave] = useState(""); // 인풋박스 값
  const [afterFlask, setAfterFlask] = useState<FlaskResType[]>([]); // 인풋박스 값
  const [freetime, setFreeTime] = useState(3); // 무료이용 가능횟수
  const isDemoOpen = useSelector(selectIsDemoModalOpen);
  const useDemoVisible = useSelector(
    (state: RootState) => state.toggle.isUseDemo
  );
  const events = useSelector((state: RootState) => state.calendar.events);
  const todoList = useSelector((state: RootState) => state.todo.todos); // 리스트 상태 가져오기
  const flask = import.meta.env.VITE_APP_FLASK_SERVER;
  const isTutorial = useSelector(selectIsTutorial);
  const tutorialIndex = useSelector(
    (state: RootState) => state.tutorial.indexTutorial
  ); // 튜토리얼 인덱스
  // 쿼리 세팅
  const [isListening, setIsListening] = useState<boolean>(false); // 음성 활성화 상태 여부를 추적
  const [showServiceIntro, setShowServiceIntro] = useState(false); // 서비스 소개

  const handleMouseEnter = () => {
    setShowServiceIntro(true);
  };

  const handleMouseLeave = () => {
    setShowServiceIntro(false);
  };

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

  // 제출하기
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
      const response = await axios.post(`${flask}/trans/date`, formData);
      // 전달 데이터
      console.log("플라스크 반환", response);
      setAfterFlask(response.data);
      for (let index = 0; index < response.data.length; index++) {
        const dataItem = response.data[index];
        // 리덕스 반영 (개발자용)
        if (dataItem.end.dateTime == null) {
          // 1. 투두
          const newTodo: TodoItem = {
            id: todoList.length + index + 1,
            summary: dataItem.summary,
          };
          // 투두생성 (개발자용)
          dispatch(addTodoRedux(newTodo));
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

  // stt
  const { listen, stop } = useSpeechRecognition({
    onResult: (result: string) => {
      // 이전 텍스트와 음성 인식으로 받은 텍스트를 합친다.
      setTextSave((prevText) => prevText + " " + result);
    },
  });
  // 음성녹음
  const toggleListening = () => {
    if (isListening) {
      stop(); // 음성 인식 비활성화
    } else {
      listen({ interimResults: false }); // 음성 인식 활성화
    }
    setIsListening(!isListening); // 상태를 반전시킴
  };

  // 컴포넌트 로딩시
  useEffect(() => {
    setTimeout(() => {
      dispatch(setTutorialStart());
    }, 800);
  }, []);

  return (
    <>
      {/* 본내용 */}
      <div className="MainContainer">
        {/* Nav Bar */}
        <div className="DemoNavbar">
          <div className="InputContaier">
            <PnjLogo />
            <div
              className={`PnjInput ${
                isTutorial && tutorialIndex == 1 && "TutorialSelect"
              }`}
            >
              <TextareaAutosize
                className={`PnjInputInner`}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="일정을 입력해보세요"
                value={textSave}
              />
            </div>
            <div className={` ${tutorialIndex == 2 && "TutorialSelect"}`}>
              {isTutorial && tutorialIndex == 1 && <DemoTutorialBox />}
              <IoMicCircle
                style={{
                  verticalAlign: "middle",
                  fontSize: "35px",
                  cursor: "pointer",
                  color: "white",
                }}
                onClick={toggleListening}
                className={`${isListening ? "icon-listening" : ""} `}
              />
              {tutorialIndex == 2 && <DemoTutorialBox />}
              {tutorialIndex == 3 && <DemoTutorialBox />}
            </div>
            <div
              className={`pasteImgBox ${
                tutorialIndex == 3 && "TutorialSelect"
              }`}
            >
              <img src={Paste} className={`pasteImg`} onClick={handlePaste} />
            </div>
            <div>
              <button
                className={`submitBtn ${
                  tutorialIndex == 4 && "TutorialSelect"
                }`}
                onClick={handleSubmit}
              >
                등록
              </button>
              {tutorialIndex == 4 && <DemoTutorialBox />}
            </div>
            <div className="FreeTxt">
              <div className="LimitTxt">횟수제한 : </div>
              <div className={`LimitTxt ${freetime === 0 ? "NotFree" : ""}`}>
                {freetime}
              </div>
            </div>
          </div>
          <div className={`NavGoogleBtn`}>
            <div className={`${tutorialIndex == 7 && "TutorialSelect"}`}>
              <GoogleLogin />
              {tutorialIndex == 7 && <DemoTutorialBox />}
            </div>
          </div>

          {/* 서비스 소개 */}
          <div
            className="ServiceIntro"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{ verticalAlign: "middle", fontSize: "30px" }}
          >
            <AiFillQuestionCircle />
            {showServiceIntro && (
              <div className="ServiceIntroTooltip">
                <div className="ServiceIntroContent">
                  <About />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* Body */}
        <div className="CalendarContainer">
          {/* 왼쪽 사이드 - 작은캘린더 / 투두리스트 */}
          <div className="LeftSideContainer">
            <div className="SmallCalendar">
              <SmallCal />
            </div>
            {tutorialIndex == 5 && <DemoTutorialBox />}
            <div
              className={`Todo-Container ${
                tutorialIndex == 6 && "TutorialSelect"
              }`}
              draggable="true"
            >
              <TodoList />
            </div>
          </div>
          {/* 오른쪽 사이드 - 큰 캘린더 */}
          <div className="RightSideContainer">
            <div
              className={`Calendar ${tutorialIndex == 5 && "TutorialSelect"}`}
            >
              <BigCalendar />
            </div>
          </div>
          {tutorialIndex == 6 && <DemoTutorialBox />}
        </div>
      </div>
      {/* 기타 */}
      {isDemoOpen && <DemoMadal before={textSave} after={afterFlask} />}
      {/* 튜토리얼 */}
      {useDemoVisible && tutorialIndex < 8 && <DemoTutorial />}
    </>
  );
}
