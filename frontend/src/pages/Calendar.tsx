import { useState, useCallback } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { useSelector, useDispatch } from 'react-redux';
import { openModal,selectIsModalOpen } from '../store/slice/calendar/ModalSlice'; // modalSlice.ts의 경로로 수정
import { selectEvents, updateEvent } from "../store/slice/calendar/CalendarSlice";
import Modal from '../components/organisms/EventForm'; 
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  overflow: hidden;
  .rbc-date-cell {
    text-align: center;
  }
  .leftArticle {
    min-width: 330px;
    height: 100vh;
    display: flex;
    justify-content: center;
    .calManagement {
      width: 90%;
      height: 57%;
    }
    .rbc-month-view {
      height: 100px;
      border: none;
    }
    .rbc-day-bg.rbc-today {
      background-color: white;
    }
    .rbc-month-row {
      border: none;
      .rbc-row-bg {
        height: 44px;
      }
    }

    .rbc-day-bg {
      border: none;
    }
    .rbc-date-cell.rbc-now,
    .rbc-date-cell.rbc-date-cell.rbc-now.rbc-current {
      .rbc-button-link {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: rgba(49, 116, 173);
        color: white;
      }
    }
    .rbc-date-cell.rbc-current {
      .rbc-button-link {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background-color: rgba(49, 116, 173, 0.5);
        color: white;
      }
    }
  }
  .middleArticle {
    width: 100%;
    height: 100%;

    .rbc-row.rbc-month-header {
      height: 40px;
      display: flex;
      align-items: center;
      .rbc-header {
        border-bottom: none;
      }
    }
    .rbc-day-bg.rbc-today {
      background-color: white;
    }
    .rbc-date-cell {
      height: 30px;
      display: flex;
      justify-content: center;
      align-items: end;
    }
    .rbc-event.rbc-event-allday {
      width: 100%;
    }
    .rbc-date-cell.rbc-now {
      .rbc-button-link {
        width: 25px;
        height: 25px;
        box-shadow: 0 0 5px #aaa;
        border-radius: 50%;
        background-color: rgba(49, 116, 173);
        color: white;
      }
    }
  }
  .rightArticle {
    position: fixed;
    top: 0;
    right: 0;
    height: 100vh;
    transition: 0.4s ease;
    z-index: 200;
  }

  .rbc-addons-dnd {
    .rbc-addons-dnd-row-body {
      position: relative;
      margin-top: 10px;
    }
    .rbc-addons-dnd-drag-row {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
    }
    .rbc-day-bg {
      &:hover {
        background-color: #eee;
      }
    }
    .rbc-addons-dnd-over {
      background-color: rgba(
        red($date-selection-bg-color),
        green($date-selection-bg-color),
        blue($date-selection-bg-color),
        0.3
      );
    }

    .rbc-event {
      transition: opacity 150ms;
      width: 100%;
      &:hover {
        .rbc-addons-dnd-resize-ns-icon,
        .rbc-addons-dnd-resize-ew-icon {
          display: block;
          background-color: #ccc;
        }
      }
    }

    .rbc-addons-dnd-dragged-event {
      opacity: 0;
    }

    &.rbc-addons-dnd-is-dragging
      .rbc-event:not(.rbc-addons-dnd-dragged-event):not(
        .rbc-addons-dnd-drag-preview
      ) {
      opacity: 0.5;
    }

    .rbc-addons-dnd-resizable {
      position: relative;
      width: 100%;
      height: 100%;
    }

    .rbc-addons-dnd-resize-ns-anchor {
      width: 100%;
      text-align: center;
      position: absolute;
      &:first-child {
        top: 0;
      }
      &:last-child {
        bottom: 0;
      }

      .rbc-addons-dnd-resize-ns-icon {
        display: none;
        border-top: 3px double;
        margin: 0 auto;
        width: 10px;
        cursor: ns-resize;
      }
    }

    .rbc-addons-dnd-resize-ew-anchor {
      position: absolute;
      top: 4px;
      bottom: 0;
      &:first-child {
        left: 0;
      }
      &:last-child {
        right: 0;
      }

      .rbc-addons-dnd-resize-ew-icon {
        display: none;
        border-left: 3px double;
        margin-top: auto;
        margin-bottom: auto;
        height: 10px;
        cursor: ew-resize;
      }
    }
  }
`;

const BigCalendarInfo = () => {
  const dispatch = useDispatch();
  //캘린더를 DragAndDrop으로 바꿉니다.
  const DragAndDropCalendar = withDragAndDrop(Calendar);
  const myEvents = useSelector((selectEvents))
  const formattedEvents = myEvents.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const isOpen = useSelector(selectIsModalOpen);


  //모달창을 띄울 useState
  //모달을 닫을 함수

  //이벤트 이동 기능
  const moveEvent = useCallback(
    ({ event, start, end }) => {
      // 이벤트 업데이트를 Redux 상태로 전달합니다.
      dispatch(
        updateEvent({
          id: event.id,
          title: event.title,
          allday: event.allday,
          start: start.toISOString(),
          end: end.toISOString(),
          memo: event.memo,
        })
      );
    },
    [dispatch]
  );

  //새로운 값을 입력

  const [selectedRange, setSelectedRange] = useState<{ start: Date, end: Date } | null>(null);
  const handleSelectSlot = ({ start, end }: { start: Date, end: Date }) => {
    setSelectedRange({ start, end });
    dispatch(openModal());
  };


  //일정 리사이즈 할 때 나오는 콜백함수 인자로 event start end가 있다.
  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      // 이벤트 리사이즈를 Redux 상태로 전달합니다.
      dispatch(
        updateEvent({
          id: event.id,
          title: event.title,
          allday: event.allday,
          start: start.toISOString(),
          end: end.toISOString(),
          memo: event.memo,
        })
      );
    },
    [dispatch]
  );

  const [onSideDate, setOnSideDate] = useState(420);
  const [onEventId, setOnEventId] = useState();
  //사이드 메뉴를 열고 닫음
  const openSideMenu = (event) => {
    console.log(event);
    setOnEventId(event.id);
    if (onSideDate === 0 && event.id === onEventId) setOnSideDate(420);
    else setOnSideDate(0);
  };

  //클릭한 날짜의 정보를 받아옴
  const [handleDate, setHandleDate] = useState<Date>();
  const handleDateChange = (date:Date) => {
    console.log(date);
    setHandleDate(date);
  };
  //클릭한 view의 정보를 받아옴
  const [currentView, setCurrentView] = useState();
  const handleViewChange = (newView) => {
    setCurrentView(newView);
  };


  return (
    <Container>
      {/* <InputDateModal
        open={onModal}
        close={closeSetOnData}
        newEventData={onMakeNewEvent}
        events={myEvents}
        refetchOnLoadData={refetchOnLoadData}
        onFormatChange={formatToOracleDate}
        formatToShowDate={formatToShowDate}
      /> */}
      <div className="leftArticle">
        <Calendar
          localizer={localizer}
          style={{ width: "90%", height: 280 }}
        //   components={{ toolbar: ToolbarMini }}
          view="month"
          //클릭한 date날짜를 가져옴
          onNavigate={handleDateChange}
          //클릭 한 view 의 유형을 가져옴
          onView={handleViewChange}
        />
      </div>
      <div className="middleArticle">
        <DragAndDropCalendar
          //시간 현지화
          localizer={localizer}
          //가져올 이벤트 값
          events={formattedEvents}
          //위치 재정의
          onEventDrop={moveEvent}
          //사이즈 재정의
          onEventResize={resizeEvent}
          //새로운 이벤트 생성 함수
          onSelectSlot={handleSelectSlot}
          //이벤트 클릭시 실행 함수
          onSelectEvent={openSideMenu}
          // onNavigate 에서 가져온 값으로 현재 날짜를 바꿈
          date={handleDate}
          //이번달 이전 다음 에서 가져올 값들
          onNavigate={handleDateChange}
          // view를 바꿀 함수 toolbar에 있는 모든 값을 받을 수 있다.
          onView={handleViewChange}
          //보여질 화면
          view={currentView}
          //이벤트 발생할 때마다
        //   eventPropGetter={eventPropGetter}
          resizable
          selectable
          style={{ height: "100vh", width: "100%" }}
        //   components={{ toolbar: Toolbar }}
        />
      </div>
      {isOpen && selectedRange && <Modal selectedRange={selectedRange} />}
      <div
        className="rightArticle"
        style={{ transform: `translateX(${onSideDate}px)` }}
      >
        {/* <SideUpdatePage
          onData={onClickEventData}
          close={openSideMenu}
          refetchOnLoadData={refetchOnLoadData}
          formatToShowDate={formatToShowDate}
          onFormatChange={formatToOracleDate}
        /> */}
        /
      </div>
    </Container>
  );
};
export default BigCalendarInfo;


