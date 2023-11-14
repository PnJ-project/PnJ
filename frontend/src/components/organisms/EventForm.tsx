// EventForm.tsx 생성
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Event, addEvent } from "../../store/slice/calendar/CalendarSlice";
import { closeModal } from "../../store/slice/calendar/ModalSlice";
import { RootState } from "../../store/store";
import styled, { keyframes } from "styled-components";
import { setSelectDate } from "../../store/slice/calendar/HandleSlice";


const EventForm: React.FC = () => {
  // 기본 세팅
  const dispatch = useDispatch();
  const events = useSelector((state: RootState) => state.calendar.events);
  const selectedRange = useSelector(setSelectDate);
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const starttime = selectedRange.rangeStart.split("T")[1]?.substr(0, 5);
  const endtime = selectedRange.rangeEnd.split("T")[1]?.substr(0, 5);
  const [sTime, setSTime] = useState(starttime||"00:00");
  const [eTime, setETime] = useState(endtime || "00:00");
  //시작 날짜에서 하루 더하면
  const [sDate, setSDate] = useState(selectedRange.rangeStart.split('T')[0]);
  const [eDate, setEDate] = useState(selectedRange.rangeEnd.split('T')[0]);
  const [allDay, setAllDay] = useState(false);

    // sDate와 eDate가 다르면 allDay를 체크하도록 설정
    useEffect(() => {
      if (sDate !== eDate) {
        setAllDay(true);
      }
    }, [sDate, eDate]);
  // 인풋 필드에서 엔터 키 입력 시 제출
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 엔터 키의 기본 동작 방지
      handleAddEvent();
    }
  };

  // 이벤트 생성
  const handleAddEvent = async () => {
    // 조건 만족안할시 반환
    if (!title) {
      setErrorMsg("일정 내용을 입력하세요 !");
      return;
    }
    console.log("여기는 eventform, events", events);

    if (selectedRange) {
      const newEvent: Event = {
        id: events.length,
        title,
        start: sDate+'T'+sTime+':00',
        end: eDate+'T'+eTime+':00',
        memo: memo,
      };

    // 일정생성 (개발자용)
    console.log("여기는 생성 form, newEvent", newEvent);
    dispatch(addEvent(newEvent));
    }

    // 원복
    dispatch(closeModal());
    setTitle("");
    setMemo("");
  };


  return (
    <Overlay
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dispatch(closeModal());
        }
      }}
    >
      <Container>
        <Header>
          <Title>일정 추가하기</Title>
          <CloseBtn onClick={() => {dispatch(closeModal())}}>✖</CloseBtn>
        </Header>
        <DateBox>
          <div>날짜</div>
          <SelectDate>
            <input type="date" value={sDate} onChange={(e) => { setSDate(e.target.value) }}
              required
              aria-required="true"/>
            <span>~</span>
            <input type="date" value={eDate} min={sDate} onChange={(e) => { setEDate(e.target.value) }} />
          </SelectDate>
          <CheckBox>
            {/* 날짜가 다르면 하루종일 체크, 변경 못하게 */}
            <input
              type="checkbox"
              id="allDay"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
              disabled={sDate !== eDate}
            />
            <label htmlFor="allDay">하루 종일</label>
          </CheckBox>
        </DateBox>
        <TimeBox>
          <div>시간</div>
          {/* 하루종일이면 시간 선택 못하게 */}
          {allDay? (<SelectTime>
            <input type="time" value={sTime} disabled />
            <span>~</span>
            <input type="time" value={eTime} disabled />
          </SelectTime>) : (<SelectDate>
              {/* 하루종일이 아닐 때 */}
            <input type="time" value={sTime} step="6000"
              onChange={(e) => {setSTime(e.target.value);}}
              />
            <span>~</span>
            <input type="time" value={eTime}  min={sTime} step="6000"
                onChange={(e) => {
                  const newETime = e.target.value > sTime ? e.target.value : sTime;
                  setETime(newETime)
              }}
            />
          </SelectDate>)}
        </TimeBox>
        <TitleBox>
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
            onKeyDown={handleKeyDown}
          />
        </TitleBox>
        <MemoBox>
          <div>메모</div>
          <input
            type="text"
            placeholder="메모를 남기세요"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </MemoBox>
        <ErrorMsg>{errorMsg}</ErrorMsg>
        <ButtonDiv>
          <AddButton onClick={handleAddEvent}>일정 추가</AddButton>
        </ButtonDiv>
      </Container>
    </Overlay>
  );
};
export default EventForm;

/** CSS */
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;
const blink = keyframes`
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
`
  const Container = styled.div`
  animation: ${fadeIn} 0.2s ease-in;
  font-family: HSSaemaul-Regular;
  position: fixed;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  z-index: 150;
  gap: 18px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  background-color: white;
  border-radius: 7px;
  box-shadow: 5px 5px 20px #525252, -5px -5px 20px #525252;
  overflow: hidden;
  transition: 0.3s ease-out;
  & > :first-child {
    margin-bottom: 30px;
  }
  input {
    /* border-color: #36513d !important; */
    padding: 5px;
    margin: 0;
    border: 1px solid #9f9a9a;
    border-radius: 5px;
    font-family: insungitCutelivelyjisu;
  }

  input[type='date'] {
  position: relative; // 캘린더 아이콘을 클릭해야만 달력이 보이기 때문에 이 영역 자체를 제어하기 위해 설정 
  text-align: center;
}

// 실제 캘린더 아이콘을 클릭하는 영역을 의미하는 선택자
// 이 영역을 확장해서 input의 어떤 곳을 클릭해도 캘린더를 클릭한 것과 같은 효과를 만들자!
input[type='date']::-webkit-calendar-picker-indicator {
  position: absolute; // 이를 설정하기 위해 사전에 relative를 설정한 것이다.
  width: 100%;
  height: 100%;
  background: transparent; // 배경은 투명하게,
  color: transparent; // 글자도 투명하게! 이 두 설정을 통해 캘린더 아이콘을 사라지게 만든다.
  cursor: pointer;
}

`;
const Header = styled.div`
  display:flex;
  justify-content:space-between;
  margin: 10px;
  `
const CloseBtn = styled.div`
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 24px;
`;
const DateBox = styled.div`
  display:flex;
  align-items:center;
  gap: 20px;
`
const SelectDate = styled.div`
  input {
    height: 20px !important;
    margin: unset !important;
  }
`;
const CheckBox = styled.div`
  display: flex;
  height: 20px;
  padding: 0;
  margin: 0;
  gap:5px;
  cursor: pointer;
  input:checked{
    background-color:#36513d;
  }
  label{
    font-size: 15px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`
const TimeBox = styled.div`
  display:flex;
  align-items:center;
  gap: 20px;
`
const SelectTime = styled.div`
  input {
    height: 20px !important;
  }
`;
const TitleBox = styled.div`
  display: flex;
  gap: 20px;
  /* justify-content:center; */
  align-items:center;
  input {
    height: 20px;
    width: 80%
  }
`
const MemoBox = styled.div`
display: flex;
gap: 20px;
input {
    height: 120px;
    width: 80%
  }

`
const ErrorMsg = styled.div`
  animation: ${blink} 1.5s 3;
  font-size: 18px;
  margin: 10px;
  color: #a73131;
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
const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;

`
const AddButton = styled.button`
  background-color: #36513d;
  color: #ffffff;
  width: 80px;
  padding: 5px;
  justify-content: center;

`