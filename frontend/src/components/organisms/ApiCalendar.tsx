// 메인 기능 캘린더 컴포넌트
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import TextareaAutosize from "react-textarea-autosize";
import { useSpeechRecognition } from "react-speech-kit";
import axiosInstance from "../../functions/AxiosInstance";
import { setAuthorizationHeaderInter } from "../../functions/BaseFunc";
import { readCalendar } from "../../api/CalendarApi";
import { readTodo } from "../../api/TodoApi";
// import TeamBtn from "../atoms/TeamBtn";
import PnjLogo from "../atoms/PnjLogo";
import LoadingBtn from "../atoms/LoadingBtn";
import GoogleLogin from "../atoms/GoogleLogin";
import TodoList from "../molecules/todo/ApiTodoList";
import ServiceInfoBtn from "../molecules/ServiceInfoBtn";
import BigCalendar from "../molecules/calendar_api/ApiBigCalendar";
import SmallCal from "../molecules/SmallCal";
import { setRecommendTrue } from "../../store/slice/ToggleSlice";
// import { openDemoModal } from "../../store/slice/calendar/ModalSlice";
import Paste from "/image/paste.svg";
import { IoMicCircle } from "react-icons/io5";
import "./DemoCalendar.css";

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
  const memberId = localStorage.getItem("memberId");
  const backend = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;
  const [textSave, setTextSave] = useState(""); // 인풋박스 값
  const [isFlaskSend, setIsFlaskSend] = useState(false); // 간편입력 토글
  const [isListening, setIsListening] = useState<boolean>(false); // 음성 활성화 상태 여부를 추적
  const startOfFiveMonthsAgo = moment()
    .subtract(6, "months")
    .startOf("month")
    .toDate()
    .toISOString(); // 5개월 전
  const endOfFiveMonthsAhead = moment()
    .add(6, "months")
    .endOf("month")
    .endOf("week")
    .toDate()
    .toISOString(); // 5개월 후
  const [timeMax] = useState(startOfFiveMonthsAgo); // 시작날짜
  const [timeMin] = useState(endOfFiveMonthsAhead); // 종료날짜

  // 쿼리세팅
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

  // 플라스크로 제출하기
  const handleSubmit = async () => {
    // 빈값일시 반환
    if (textSave.trim() === "") {
      console.log("빈값 반환");
      return;
    }
    // 플라스크 api 연결
    setIsFlaskSend(true);
    const formData = { input: textSave, memberId: memberId };
    await setAuthorizationHeaderInter();
    try {
      const response = await axiosInstance.post(
        `${backend}/api/calendar/input`,
        formData
      );
      console.log("일정 변환 반환", response);
      // 데이터 리패치
      await refetchTodo();
      await refetchCal();
      // 인풋 필드 리셋
      setTextSave("");
      setIsFlaskSend(false);
      return response;
    } catch (error) {
      console.error("Error flask data:", error);
    }
  };

  // 인풋 필드에서 엔터 키 입력 시 제출
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 엔터 키의 기본 동작 방지
      handleSubmit();
    }
  };

  // STT
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

  return (
    <>
      <div className="MainContainer">
        {/* Nav Bar */}
        <div className="DemoNavbar">
          <div className="InputContaier">
            {/* 1. 로고 */}
            <PnjLogo />
            {/* 2. 인풋박스 */}
            <div className="PnjInput">
              <TextareaAutosize
                className={`PnjInputInner`}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="일정을 입력해보세요"
                value={textSave}
              />
            </div>
            {/* 3. 등록버튼 */}
            {!isFlaskSend ? (
              <div className="submitBtn" onClick={handleSubmit}>
                등록
              </div>
            ) : (
              <LoadingBtn />
            )}

            {/* 4. 음성녹음 버튼 */}
            <IoMicCircle
              onClick={toggleListening}
              className={`SoundIcon ${isListening ? "icon-listening" : ""}`}
            />
            {/* 5. 붙여넣기 버튼 */}
            <img src={Paste} className="pasteImg" onClick={handlePaste} />
          </div>
          {/* 우측 버튼 */}
          <div className="NavGoogleBtn">
            <button
              className="googleLogin marginBtn"
              onClick={() => {
                dispatch(setRecommendTrue());
              }}
            >
              일정 추천
            </button>
            {/* <TeamBtn /> */}
            <GoogleLogin />
            {/* 서비스 소개 */}
            <ServiceInfoBtn />
          </div>
        </div>
        {/* Body */}
        <div className="CalendarContainer">
          {/* 왼쪽 사이드 - 작은캘린더 / 투두리스트 */}
          <div className="LeftSideContainer">
            <div className="SmallCalendar">
              <SmallCal />
            </div>
            <div className="Todo-Container" draggable="true">
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
