import { useState, useCallback, useEffect } from "react";
import { Event as BigCalendarEvent } from "react-big-calendar";
import { Calendar, View, momentLocalizer } from "react-big-calendar";
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  selectIsModalOpen,
} from "../../store/slice/calendar/ModalSlice"; // modalSlice.ts의 경로로 수정
import {
  selectEvents,
  updateEvent,
  setEvents,
} from "../../store/slice/calendar/CalendarSlice";
import { change, handleDate } from "../../store/slice/calendar/HandleSlice";
import Modal from "../../components/organisms/EventForm";
import moment from "moment";
// import { Event } from '../../store/slice/calendar/CalendarSlice'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import styled from "styled-components";
import { useQuery } from "react-query";
import { readCalendar } from "../../api/CalendarApi";

interface FormatEvent {
  id: number;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  memo?: string;
}

const BigCalendarInfo = () => {
  // 기본 세팅
  const [timeMax] = useState(moment().startOf("month").toDate().toISOString());
  const [timeMin] = useState(
    moment().endOf("month").endOf("week").toDate().toISOString()
  );
  const { data: calData, refetch: refetchCal } = useQuery(
    "calendarData",
    () => readCalendar(timeMax, timeMin),
    { retry: false }
  ); // calendar API
  const localizer = momentLocalizer(moment);
  moment.locale("ko-KR");
  //캘린더를 DragAndDrop으로 바꿉니다.
  const DragAndDropCalendar = withDragAndDrop(Calendar);
  const dispatch = useDispatch();
  const [myEventsJunha] = useState(useSelector(selectEvents));
  const [, setFormattedEventsJunha] = useState<FormatEvent[]>([]);
  const myEvents = useSelector(selectEvents);
  const formattedEvents = myEvents.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const isOpen = useSelector(selectIsModalOpen);
  const date: string = useSelector(handleDate);
  const handledate: Date = new Date(date);

  //모달창을 띄울 useState
  //모달을 닫을 함수

  //이벤트 이동 기능
  const moveEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs<BigCalendarEvent>) => {
      // 이벤트 업데이트를 Redux 상태로 전달합니다.
      // const refactorEvent = {
      //   id: event.id,

      // }
      // event 객체에서 start와 end를 제외한 속성들을 추리기
      const restEvent = Object.assign({}, event, {
        start: undefined,
        end: undefined,
      });
      dispatch(
        updateEvent({
          title: event.title?.toString(),
          allDay: event.allDay,
          start: start.toString(),
          end: end.toString(),
          resource: { event: restEvent },
        })
      );
    },
    [dispatch]
  );

  //새로운 값을 입력

  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedRange({ start, end });
    dispatch(openModal());
  };

  //일정 리사이즈 할 때 나오는 콜백함수 인자로 event start end가 있다.
  const resizeEvent = useCallback(
    ({ event, start, end }: EventInteractionArgs<BigCalendarEvent>) => {
      // event 객체에서 start와 end를 제외한 속성들을 추리기
      const restEvent = Object.assign({}, event, {
        start: undefined,
        end: undefined,
      });
      // 이벤트 리사이즈를 Redux 상태로 전달합니다.
      dispatch(
        updateEvent({
          title: event.title?.toString(),
          allDay: event.allDay,
          start: start.toString(),
          end: end.toString(),
          resource: { event: restEvent },
        })
      );
    },
    [dispatch]
  );

  // const [onSideDate, setOnSideDate] = useState(420);
  // const [onEventId, setOnEventId] = useState<number>(0);
  // //사이드 메뉴를 열고 닫음
  // const openSideMenu = (event:Event) => {
  //   console.log(event);
  //   setOnEventId(event.id);
  //   if (onSideDate === 0 && event.id === onEventId) setOnSideDate(420);
  //   else setOnSideDate(0);
  // };

  //클릭한 날짜의 정보를 받아옴
  const handleDateChange = (date: Date) => {
    console.log(date);
    const formDate = date.toISOString();
    dispatch(change(formDate));
  };

  //클릭한 view의 정보를 받아옴
  const [currentView, setCurrentView] = useState<View | undefined>();
  const handleViewChange = (newView: View | undefined) => {
    setCurrentView(newView);
  };

  // 캘린더 데이터 리덕스에 업데이트 (준하 작업)
  useEffect(() => {
    if (calData && calData.message == "이벤트 리스트 조회 완료") {
      // 리덕스에 업데이트
      console.log(calData.data);
      dispatch(setEvents(calData.data));
    }
  }, [calData]);

  // 리덕스 데이터 -> useState 데이터 받아오기
  useEffect(() => {
    if (myEventsJunha.length > 1 && myEventsJunha[0].start) {
      const formattedEvents = myEventsJunha.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setFormattedEventsJunha(formattedEvents);
    }
  }, [myEventsJunha]);

  return (
    <Container>
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
          // onSelectEvent={openSideMenu}
          // onNavigate 에서 가져온 값으로 현재 날짜를 바꿈
          date={handledate}
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
          style={{ height: "100%", width: "100%" }}
          //   components={{ toolbar: Toolbar }}
        />
      </div>
      {isOpen && selectedRange && <Modal selectedRange={selectedRange} />}
    </Container>
  );
};
export default BigCalendarInfo;

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
  // 일(일주일) 전체
  .rbc-date-cell {
    text-align: center;
    .rbc-button-link {
      //오늘날짜말고 다른 거 다 포함 일자 높이
      height: 25px;
    }
  }
  // BigCalendar
  .middleArticle {
    width: 100%;
    height: 100%;
    .rbc-month-view {
      height: 90%;
      flex: unset;
    }
    .rbc-toolbar {
      height: 10%;
      margin-bottom: 0;
    }
    .rbc-row.rbc-month-header {
      height: 8%;
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
      height: 10%;
      display: flex;
      justify-content: center;
      align-items: end;
    }
    // 일정 적힌 박스
    .rbc-event.rbc-event-allday {
      width: 100%;
    }
    // 오늘 클릭하면 동그라미 나타나는 거
    .rbc-date-cell.rbc-now {
      .rbc-button-link {
        width: 25px;
        box-shadow: 0 0 5px #aaa;
        border-radius: 50%;
        background-color: rgba(49, 116, 173);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
      }
    }
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
