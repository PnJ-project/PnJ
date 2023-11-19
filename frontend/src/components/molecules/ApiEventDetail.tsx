// ApiEventDetail.tsx api수정 모달 창

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateEvent,
  deleteEvent,
} from "../../store/slice/calendar/CalendarSlice";
import { closeSideModal } from "../../store/slice/calendar/ModalSlice";
import { RootState } from "../../store/store";
import styled, { keyframes } from "styled-components";
import formatDateTime, {
  setAuthorizationHeaderInter,
} from "../../functions/BaseFunc";
import axiosInstance from "../../functions/AxiosInstance";

// 모달 타입
interface ModalProps {
  id: number | string | unknown;
}
// 백엔드
// const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

const EventForm: React.FC<ModalProps> = ({ id }) => {
  // 기본 세팅
  const dispatch = useDispatch();
  const [memberId] = useState(Number(localStorage.getItem("memberId")));
  const events = useSelector((state: RootState) => state.calendar.events);
  const event = events.find((event) => event.id === id);
  const [title, setTitle] = useState(event?.title);
  const [memo, setMemo] = useState(event?.memo);
  const [colorId, setColorId] = useState(event?.colorId);
  const [errorMsg, setErrorMsg] = useState("");
  const startDate = event?.start.split("T")[0];
  const endDate = event?.end.split("T")[0];
  const [sDate, setSDate] = useState(startDate || "");
  const [eDate, setEDate] = useState(endDate || "");
  const starttime = event?.start.split("T")[1]?.substr(0, 5);
  const endtime = event?.end.split("T")[1]?.substr(0, 5);
  const [sTime, setSTime] = useState(starttime || "00:00");
  const [eTime, setETime] = useState(endtime || "00:00");
  const [allDay, setAllDay] = useState(event?.allDay);
  const [showEDate, setShowEDate] = useState(eDate);

  // sDate와 eDate가 다르면 allDay를 체크하도록 설정
  useEffect(() => {
    if (sDate !== showEDate && sTime == "00:00" && eTime == "00:00") {
      setAllDay(true);
    }
  }, [sDate, showEDate]);

  useEffect(() => {
    // 하루종일이면 showEDate = eDate - 1
    if (sDate !== showEDate && allDay && sTime == "00:00" && eTime == "00:00") {
      const newEDate = new Date(eDate);
      newEDate.setDate(newEDate.getDate() - 1);
      const lastEDate = formatDateTime(newEDate).split("T")[0];
      setShowEDate(lastEDate);
    }
    if (!allDay && sDate === showEDate) {
      setEDate(showEDate)
    }
  },[sDate, eDate,allDay])

  // 인풋 필드에서 엔터 키 입력 시 제출
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // 엔터 키의 기본 동작 방지
      handleUpdateEvent();
    }
  };

  // 이벤트 수정
  const handleUpdateEvent = async () => {
    // 조건 만족안할시 반환
    if (!event) {
      return;
    }
    if (!title) {
      setErrorMsg("일정 내용을 입력하세요");
      return;
    }
    const updateItem = {
      id: id,
      title,
      start: sDate + "T" + sTime + ":00",
      end: eDate + "T" + eTime + ":00",
      colorId: colorId,
      allDay: allDay,
      memo: memo,
      resource: { event: { id: id, memo: memo,colorId: colorId } },
    };
    // 일정수정 (개발자용)
    dispatch(updateEvent(updateItem));
    // 원복
    dispatch(closeSideModal());
    setTitle("");
    setMemo("");
    // 캘린더 업데이트 API 요청
    const reqNewEvent = {
      memberId: memberId,
      event: {
        id: id,
        summary: title,
        description: memo,
        colorId: colorId,
        start: {
          dateTime: !allDay ? sDate + "T" + sTime + ":00" : null,
          timeZone: "Asia/Seoul",
          date: allDay ? sDate : null,
        },
        end: {
          dateTime: !allDay ? eDate + "T" + eTime + ":00" : null,
          timeZone: "Asia/Seoul",
          date: allDay ? eDate : null,
        },
      },
    };
    await setAuthorizationHeaderInter();
    try {
      await axiosInstance.put(`${local_back_url}/api/calendar/v2`, reqNewEvent);
      // 캘린더 다시 불러오기
      console.log("구글 캘린더 수정 api 완료");
    } catch (error) {
      console.error("구글 캘린더 수정 에러:", error);
      setErrorMsg("서버와 연결할 수 없습니다. 다시 시도해주세요");
      return;
    }
  };

  // 이벤트 삭제
  const handleDeleteEvent = async () => {
    // 삭제할거냐는 메세지 띄우기
    // 일정삭제 (개발자용)
    if (typeof id == "number" || typeof id == "string") {
      dispatch(deleteEvent(id));
    }
    // 원복
    dispatch(closeSideModal());
    // 캘린더 삭제 API 요청
    await setAuthorizationHeaderInter();
    try {
      const res = await axiosInstance.delete(
        `${local_back_url}/api/calendar/v2/${memberId}/${id}`
      );
      // 이벤트 다시 불러오기
      console.log("캘린더 api 삭제 완료", res);
    } catch (error) {
      setErrorMsg("일정 삭제에 실패했습니다. 다시 시도해주세요");
      console.error("캘린더 삭제 에러:", error);
    }
  };
  // 색깔 정하기
  const colorMap:{[key: number]: string} = {
    1: '#fe4d00',
    2: '#fa92a3',
    3: '#fe9e14',
    4: '#fed136',
    5: '#d6d755',
    6: '#a1c7a5',
    7: '#01b391',
    8: '#41a8f5',
    9: '#7ea0c3',
    10: '#ba7fd1',
  };
  const handleBoxClick = (key: string) => {
    console.log(key);
    const numKey = Number(key);
    setColorId(numKey);
  };

  return (
    <Overlay
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dispatch(closeSideModal());
        }
      }}
    >
      <Container>
        <Header>
          <Title>일정 수정하기</Title>
          <CloseBtn
            onClick={() => {
              dispatch(closeSideModal());
            }}
          >
            ✖
          </CloseBtn>
        </Header>
        <ColorBox>
        {Object.entries(colorMap).map(([key, color]) => (
          <ColorDiv
            key={key}
            color = {color}
            style={{
              width: colorId === Number(key) ? '38px' :'30px',
              height: colorId === Number(key) ? '38px' :'30px',
            }}
            onClick={() => handleBoxClick(key)}
          />
        ))}
        </ColorBox>
        <DateBox>
          <div>날짜</div>
          <SelectDate>
            <input
              type="date"
              value={sDate}
              onChange={(e) => {
                setSDate(e.target.value);
              }}
            />
            <span>~</span>
            <input
              type="date"
              value={showEDate}
              min={sDate}
              onChange={(e) => {
                setShowEDate(e.target.value);
                // 하루 종일이면 하루 더해서 api 요청
                if (allDay && sTime === "00:00" && eTime === "00:00") {
                  const newEDate = new Date(e.target.value);
                  newEDate.setDate(newEDate.getDate() + 1);
                  const lastEDate = formatDateTime(newEDate).split("T")[0];
                  setEDate(lastEDate);
                }
                // 종일 일정이 아니면 하루 빼서(showdate대로) 요청
                else {
                  setEDate(e.target.value);
                }
              }}
            />
          </SelectDate>
          <CheckBox>
            {/* 날짜가 다르면 하루종일 체크, 변경 못하게 */}
            <input
              type="checkbox"
              id="allDay"
              checked={allDay}
              onChange={(e) => {
                setAllDay(e.target.checked)
              }}
              // disabled={sDate !== eDate}
            />
            <label htmlFor="allDay">하루 종일</label>
          </CheckBox>
        </DateBox>
        <TimeBox>
          <div>시간</div>
          {/* 하루종일이면 시간 선택 못하게 */}
          {allDay ? (
            <SelectTime>
              <input type="time" value={""} disabled />
              <span>~</span>
              <input type="time" value={""} disabled />
            </SelectTime>
          ) : (
            <SelectDate>
              {/* 하루종일이 아닐 때 */}
              <input
                type="time"
                value={sTime}
                step="6000"
                onChange={(e) => {
                  setSTime(e.target.value);
                }}
              />
              <span>~</span>
              <input
                type="time"
                value={eTime}
                min={sTime}
                step="6000"
                onChange={(e) => {
                  const newETime =
                    e.target.value > sTime ? e.target.value : sTime;
                  setETime(newETime);
                }}
              />
            </SelectDate>
          )}
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
          <EditButton onClick={handleDeleteEvent}>일정 삭제</EditButton>
          <DeleteButton onClick={handleUpdateEvent}>일정 변경</DeleteButton>
        </ButtonDiv>
      </Container>
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
const blink = keyframes`
  0%, 50%, 100% {
    opacity: 1;
  }
  25%, 75% {
    opacity: 0;
  }
`;
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

  input[type="date"] {
    position: relative; // 캘린더 아이콘을 클릭해야만 달력이 보이기 때문에 이 영역 자체를 제어하기 위해 설정
    text-align: center;
  }

  // 실제 캘린더 아이콘을 클릭하는 영역을 의미하는 선택자
  // 이 영역을 확장해서 input의 어떤 곳을 클릭해도 캘린더를 클릭한 것과 같은 효과를 만들자!
  input[type="date"]::-webkit-calendar-picker-indicator {
    position: absolute; // 이를 설정하기 위해 사전에 relative를 설정한 것이다.
    width: 100%;
    height: 100%;
    background: transparent; // 배경은 투명하게,
    color: transparent; // 글자도 투명하게! 이 두 설정을 통해 캘린더 아이콘을 사라지게 만든다.
    cursor: pointer;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`;
const ColorBox = styled.div`
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
`
const ColorDiv = styled.div`
  cursor: pointer;
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.color};
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    width: 38px;
    height: 38px;
  }
`;
const CloseBtn = styled.div`
  cursor: pointer;
`;
const Title = styled.div`
  font-family: insungitCutelivelyjisu;
  font-weight: 500;
  font-size: 24px;
`;
const DateBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
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
  gap: 5px;
  cursor: pointer;
  input:checked {
    background-color: #36513d;
  }
  label {
    font-size: 15px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;
const TimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const SelectTime = styled.div`
  input {
    height: 20px !important;
  }
`;
const TitleBox = styled.div`
  display: flex;
  gap: 20px;
  /* justify-content:center; */
  align-items: center;
  input {
    height: 20px;
    width: 80%;
  }
`;
const MemoBox = styled.div`
  display: flex;
  gap: 20px;
  input {
    height: 120px;
    width: 80%;
  }
`;
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
`;
const EditButton = styled.button`
  background-color: #36513d;
  color: #ffffff;
  width: 80px;
  padding: 5px;
  justify-content: center;
`;
const DeleteButton = styled.button`
  background-color: #36513d;
  color: #ffffff;
  width: 80px;
  padding: 5px;
  justify-content: center;
`;
