import { useQuery } from "react-query";
import { useState, useCallback, useEffect } from "react";
import { Event as BigCalendarEvent } from "react-big-calendar";
import { Calendar, View, momentLocalizer } from "react-big-calendar";
import { useSelector, useDispatch } from "react-redux";
import {
  openModal,
  openSideModal,
  selectIsModalOpen,
  selectIsSideModalOpen,
} from "../../store/slice/calendar/ModalSlice"; // modalSlice.ts의 경로로 수정
import {
  selectEvents,
  updateEvent,
  setEvents,
} from "../../store/slice/calendar/CalendarSlice";
import { change, handleDate } from "../../store/slice/calendar/HandleSlice";
import Modal from "../../components/organisms/EventForm";
import DetailModal from "../../components/organisms/EventDetail";
import moment from "moment";
// import { Event } from '../../store/slice/calendar/CalendarSlice'
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { readCalendar } from "../../api/CalendarApi";
import styled from "styled-components";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import axios from "axios";

// 이벤트 캘린더 폼
interface FormatEvent {
  id: number;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  memo?: string;
}

// 백엔드
// const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER;
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

const BigCalendarInfo = () => {
  // 기본 세팅
  const [memberId] = useState(Number(localStorage.getItem("memberId")));
  const [timeMax] = useState(moment().startOf("month").toDate().toISOString());
  const [timeMin] = useState(
    moment().endOf("month").endOf("week").toDate().toISOString()
  );
  const [detailEvent, setDetailEvent] = useState<number | string | unknown>("");
  const { data: calData, refetch: refetchCal } = useQuery(
    "calendarData",
    () => readCalendar(timeMax, timeMin),
    { retry: false }
  ); // calendar API
  const localizer = momentLocalizer(moment);
  moment.locale("ko-KR");
  // 캘린더를 DragAndDrop으로 바꿉니다.
  const DragAndDropCalendar = withDragAndDrop(Calendar);
  const dispatch = useDispatch();
  // 캘린더용 데이터 파싱
  const [myEventsJunha] = useState(useSelector(selectEvents));
  const [, setFormattedEventsJunha] = useState<FormatEvent[]>([]);
  const myEvents = useSelector(selectEvents);
  const formattedEvents = myEvents.map((event) => ({
    ...event,
    start: new Date(event.start),
    end: new Date(event.end),
  }));

  const isOpen = useSelector(selectIsModalOpen);
  const isSideOpen = useSelector(selectIsSideModalOpen);
  const date: string = useSelector(handleDate);
  const handledate: Date = new Date(date);

  // 이벤트 이동 기능
  const moveEvent = useCallback(
    async ({ event, start, end }: EventInteractionArgs<BigCalendarEvent>) => {
      // event 객체에서 start와 end를 제외한 속성들을 추리기
      const restEvent = Object.assign({}, event, {
        start: undefined,
        end: undefined,
      });
      // 일정변경 (개발자용)
      dispatch(
        updateEvent({
          title: event.title?.toString(),
          allDay: event.allDay,
          start: start.toString(),
          end: end.toString(),
          resource: { event: restEvent },
        })
      );
      // 캘린더 수정 API 요청
      const reqUpdateEvent = {
        memberId: memberId,
        event: {
          id: null,
          summary: event.title?.toString(),
          colorId: null,
          start: {
            dateTime: start.toString(),
            timeZone: "Asia/Seoul",
            date: null,
          },
          end: {
            dateTime: end.toString(),
            timeZone: "Asia/Seoul",
            date: null,
          },
        },
      };
      try {
        await axios.put(`${local_back_url}/api/calendar`, reqUpdateEvent);
        // 캘린더 다시 불러오기
        console.log("구글 캘린더 수정 완료");
        await refetchCal();
      } catch (error) {
        console.error("구글 캘린더 수정 에러:", error);
        return;
      }
    },
    [dispatch]
  );

  // 이벤트 추가 모달 켜기
  const [selectedRange, setSelectedRange] = useState<{
    start: Date;
    end: Date;
  } | null>(null);
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setSelectedRange({ start, end });
    dispatch(openModal());
  };

  // 이벤트 리사이즈 기능
  const resizeEvent = useCallback(
    async ({ event, start, end }: EventInteractionArgs<BigCalendarEvent>) => {
      // event 객체에서 start와 end를 제외한 속성들을 추리기
      const restEvent = Object.assign({}, event, {
        start: undefined,
        end: undefined,
      });
      // 일정변경 (개발자용)
      dispatch(
        updateEvent({
          title: event.title?.toString(),
          allDay: event.allDay,
          start: start.toString(),
          end: end.toString(),
          resource: { event: restEvent },
        })
      );
      // 캘린더 수정 API 요청
      const reqUpdateEvent = {
        memberId: memberId,
        event: {
          id: null,
          summary: event.title?.toString(),
          colorId: null,
          start: {
            dateTime: start.toString(),
            timeZone: "Asia/Seoul",
            date: null,
          },
          end: {
            dateTime: end.toString(),
            timeZone: "Asia/Seoul",
            date: null,
          },
        },
      };
      try {
        await axios.put(`${local_back_url}/api/calendar`, reqUpdateEvent);
        // 캘린더 다시 불러오기
        console.log("구글 캘린더 수정 완료");
        await refetchCal();
      } catch (error) {
        console.error("구글 캘린더 수정 에러:", error);
        return;
      }
    },
    [dispatch]
  );

  // 이벤트 상세조회
  const openSideMenu = (event: BigCalendarEvent) => {
    console.log("이벤트 상세조회", event);
    if ("id" in event) {
      console.log(event.id);
      setDetailEvent(event.id);
    }
    // 상세조회할 이벤트 리덕스에 저장
    dispatch(openSideModal());
  };

  // 클릭한 날짜의 정보를 받아옴
  const handleDateChange = (date: Date) => {
    console.log(date);
    const formDate = date.toISOString();
    dispatch(change(formDate));
  };

  // 클릭한 view의 정보를 받아옴
  const [currentView, setCurrentView] = useState<View | undefined>();
  const handleViewChange = (newView: View | undefined) => {
    setCurrentView(newView);
  };

  // 캘린더 데이터 리덕스에 업데이트 (준하 작업)
  useEffect(() => {
    if (calData && calData.message == "이벤트 리스트 조회 완료") {
      // 리덕스에 업데이트
      console.log("캘린더 데이터가 갱신됩니다", calData.data);
      dispatch(setEvents(calData.data));
    }
  }, [calData]);

  // 리덕스 데이터 -> useState 데이터 받아오기 (준하 작업)
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
          onSelectEvent={openSideMenu}
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
      {isOpen && selectedRange && (
        <Modal selectedRange={selectedRange} refetchCal={refetchCal} />
      )}
      {isSideOpen && <DetailModal id={detailEvent} refetchCal={refetchCal} />}
    </Container>
  );
};
export default BigCalendarInfo;

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
  /* 일정 항목 */
  .rbc-event-content {
    font-size: 12px;
  }
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