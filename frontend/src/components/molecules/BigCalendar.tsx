import { useState, useCallback, useEffect } from "react";
import { Event as BigCalendarEvent, stringOrDate } from "react-big-calendar";
import { Event as DragEvent } from "../../store/slice/calendar/CalendarSlice";
import { Calendar, View, momentLocalizer } from "react-big-calendar";
import { useSelector, useDispatch } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// 언어, 시간대 설정
import moment from "moment";
import "moment/locale/ko";

import {
  openModal,
  openSideModal,
  selectIsModalOpen,
  selectIsSideModalOpen,
} from "../../store/slice/calendar/ModalSlice";
import {
  selectEvents,
  updateEvent,
  addEvent,
} from "../../store/slice/calendar/CalendarSlice";
import { change, handleDate, selectRangeDate } from "../../store/slice/calendar/HandleSlice";
import Modal from "../organisms/EventForm";
import DetailModal from "../organisms/EventDetail";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import styled from "styled-components";
import Toolbar from "./Toolbar";

// Drag and Drop
// import { useDrop } from 'react-dnd';

import {
  removeTodoRedux,
  selectDraggedTodo,
  setDraggedTodo,
} from "../../store/slice/calendar/TodoSlice";
import formatDateTime from "../../functions/BaseFunc";
// 이벤트 캘린더 폼
interface FormatEvent {
  id: number;
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
  memo?: string;
  colorId?: number;
}

const BigCalendarInfo = () => {
  // 기본 세팅
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpen);
  const isSideOpen = useSelector(selectIsSideModalOpen);
  const date: string = useSelector(handleDate);
  const [detailEvent, setDetailEvent] = useState<number | string | unknown>("");

  // 캘린더를 DragAndDrop으로 바꿉니다.
  const DragAndDropCalendar = withDragAndDrop(Calendar);
  // 시간대를 한국으로 설정
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  // 캘린더용 데이터 파싱
  const myEvents = useSelector(selectEvents);
  const [formattedEvents, setFormattedEventsJunha] = useState<FormatEvent[]>(
    []
  );
  const handledate: Date = new Date(date);

  // 요일,날짜 Toolbar 변경
  const formats = {
    dateFormat: 'D',
    dayFormat: 'D일',
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
      const startDate = moment(start).format('M월 D일');
      const endDate = moment(end).format('M월 D일');
      return `${startDate} - ${endDate}`;
    },
    // view가 month일 때 화살표 있는 쪽 년월
    monthHeaderFormat: 'YYYY년 M월',
    //view가 day일 때
    dayHeaderFormat: 'M월 D일 ddd',
    dayRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
      const startDate = moment(start).format('M월 D일');
      const endDate = moment(end).format('M월 D일');
      return `${startDate} - ${endDate}`;
    },
  };

  // 이벤트 이동 기능
  const moveEvent = useCallback(
    async ({ event, start, end }: EventInteractionArgs<BigCalendarEvent>) => {
      // event 객체에서 start와 end를 제외한 속성들을 추리기
      const restEvent = Object.assign({}, event, {
        start: undefined,
        end: undefined,
      });
      // 일정변경 이동 (개발자용)
      if (start instanceof Date && end instanceof Date) {
        dispatch(
          updateEvent({
            title: event.title?.toString(),
            allDay: event.allDay,
            start: formatDateTime(start),
            end: formatDateTime(end),
            resource: { event: restEvent },
          })
        );
      }
    },
    [dispatch]
  );

  // 이벤트 추가 모달 켜기
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    dispatch(openModal());
    
    const reduxselectRangeDate = {
      rangeStart:formatDateTime(start),
      rangeEnd:formatDateTime(end),
    }
    console.log(reduxselectRangeDate,'reduxselectRangeDate')
    dispatch(selectRangeDate(reduxselectRangeDate))
  };

  // 이벤트 리사이즈 기능
  const resizeEvent = useCallback(
    async ({ event, start, end }: EventInteractionArgs<BigCalendarEvent>) => {
      // event 객체에서 start와 end를 제외한 속성들을 추리기
      const restEvent = Object.assign({}, event, {
        start: undefined,
        end: undefined,
      });
      // 일정변경 리사이즈 (개발자용)
      if (start instanceof Date && end instanceof Date) {
        dispatch(
          updateEvent({
            title: event.title?.toString(),
            allDay: event.allDay,
            start: formatDateTime(start),
            end: formatDateTime(end),
            resource: { event: restEvent },
          })
        );
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
    console.log('클릭한 날짜의 정보를 받아옴',date);
    const formDate = formatDateTime(date);
    dispatch(change(formDate));
  };

  // 클릭한 view의 정보를 받아옴
  const [currentView, setCurrentView] = useState<View | undefined>();
  const handleViewChange = (newView: View | undefined) => {
    setCurrentView(newView);
  };

  // 리덕스 데이터 -> useState 데이터 받아오기 (준하 작업)
  useEffect(() => {
    if (myEvents) {
      const formattedEvents = myEvents.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setFormattedEventsJunha(formattedEvents);
    }
  }, [myEvents]);
  // style

  // Drop
  // Todo.tsx 에서 Drag한 event
  const draggedTodo = useSelector(selectDraggedTodo);

  const onDropFromOutside = useCallback(
    async ({ start, end }: { start: stringOrDate; end: stringOrDate }) => {
      if (draggedTodo === null) {
        return;
      }

      // 드래그한 항목의 정보
      const { id, summary } = draggedTodo;
      start = new Date(start);
      end = new Date(end);
      // 새로운 이벤트 객체 생성 (여기에서는 월별 달력이므로 allDay는 무조건 true로 설정)
      const newEvent: DragEvent = {
        id: id,
        title: summary,
        colorId: 6,
        allDay: true,
        start: formatDateTime(start),
        end: formatDateTime(end),
        memo: "",
      };
      // 캘린더 상태 업데이트를 위해 액션 디스패치
      dispatch(addEvent(newEvent));
      // 드래그한 항목을 Redux store에서 제거
      dispatch(setDraggedTodo(null));
      dispatch(removeTodoRedux(id));
    },
    [draggedTodo, dispatch]
  );

  // Drag
  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };
  const getEventStyle = (event: BigCalendarEvent) => {
    if ("colorId" in event) {
      const newColorId = Number(event.colorId)
      const backgroundColor = colorMap[newColorId]; // 기본값 1로 설정
      return {
        style: {
          backgroundColor,
          borderRadius: '5px',
          color: 'white',
          border: '1px solid #ccc',
        },
      };
    }
    else {
      const backgroundColor = colorMap[6]; // 기본값 1로 설정
      return {
        style: {
          backgroundColor,
          borderRadius: '5px',
          color: 'white',
          border: '1px solid #ccc',
        },
      };
    }
  
  };
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
          resizable
          onEventResize={resizeEvent}
          //새로운 이벤트 생성 함수
          selectable
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
          style={{ height: "100%", width: "100%" }}
          // Todo -> Calendar DROP 밖에서 캘린더로
          onDropFromOutside={onDropFromOutside}
          // Calendar -> Todo DRAG 캘린더에서 밖으로
          onDragOver={handleDragOver}
          // Toolbar 커스터마이징
          components={{
            toolbar: Toolbar,
          }}
          // colorId에 따른 색상 변경
          eventPropGetter={(event: BigCalendarEvent) => getEventStyle(event)}
          formats={formats}
        />
      </div>
      {isOpen && <Modal/>}
      {isSideOpen && <DetailModal id={detailEvent} />}
    </Container>
  );
};
export default BigCalendarInfo;
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
/** CSS */
const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
  //+more라고 보이는 부분
  .rbc-row-segment{
    display: flex;
    text-align: center;
  }
  .rbc-show-more {
    color: black;
  }
  /* 일정 항목 */
  .rbc-event-content {
    font-size: 12px;
    margin: auto;
    width: 95%;
    font-family: SUITE-Regular;
    text-shadow: 1px 1px 2px rgba(73, 73, 73, 0.6),
      -1px -1px 1px rgba(73, 73, 73, 0.2) !important;
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
      height: 100%;
      flex: unset;
    }
    .rbc-toolbar {
      height: 10%;
      margin-bottom: 0;
    }
    // 요일 있는 가로 한줄
    .rbc-row.rbc-month-header {
      height: 6%;
      display: flex;
      align-items: center;
      font-family:insungitCutelivelyjisu;
      font-size:20px;
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
      background-color: #fa92a3;
    }

    // 오늘 클릭하면 동그라미 나타나는 거
    .rbc-date-cell.rbc-now {
      .rbc-button-link {
        width: 25px;
        border-radius: 50%;
        /* background-color: rgba(181, 255, 63, 0.8); */
        background-color: rgba(0, 0, 0, 0.5);
        color: #ffffff;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  .rbc-addons-dnd {
    .rbc-addons-dnd-row-body {
      position: relative;
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
      background-color: #fed136;
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
      /* position: absolute; */
      top: 0px;
      bottom: 0;
      margin: auto;
      height: 80%;
      width: 4px;
      /* background-color: black; */
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
