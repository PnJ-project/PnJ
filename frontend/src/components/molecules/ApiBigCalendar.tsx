import { useQuery, useQueryClient } from "react-query";
import { useState, useCallback, useEffect } from "react";
import {
  Event as BigCalendarEvent,
  stringOrDate,
  Calendar,
  View,
  momentLocalizer,
} from "react-big-calendar";
import { useSelector, useDispatch } from "react-redux";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
// 언어, 시간대 설정
import moment from "moment";
import "moment/locale/ko";
import {
  Event as DragEvent,
  apiUpdateEvent,
} from "../../store/slice/calendar/CalendarSlice";
import {
  openModal,
  openSideModal,
  selectIsModalOpen,
  selectIsSideModalOpen,
} from "../../store/slice/calendar/ModalSlice";
import {
  selectEvents,
  updateEvent,
  setEvents,
  addEvent,
} from "../../store/slice/calendar/CalendarSlice";
import {
  change,
  handleDate,
  selectRangeDate,
} from "../../store/slice/calendar/HandleSlice";
import Modal from "./ApiEventForm";
import DetailModal from "./ApiEventDetail";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import { readCalendar } from "../../api/CalendarApi";
import styled from "styled-components";
import Toolbar from "./Toolbar";

// Drag and Drop
import {
  removeTodoRedux,
  selectDraggedTodo,
  setDraggedTodo,
} from "../../store/slice/calendar/TodoSlice";
import formatDateTime, {
  setAuthorizationHeaderInter,
} from "../../functions/BaseFunc";
import axiosInstance from "../../functions/AxiosInstance";
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
interface CalendarRes {
  id: number;
  start: { dateTime: string; date: string };
  end: { dateTime: string; date: string };
  summary: string;
  description: string;
  colorId?: number;
}
// 백엔드
const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;

const BigCalendarInfo = () => {
  // 기본 세팅
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsModalOpen);
  const isSideOpen = useSelector(selectIsSideModalOpen);
  const date: string = useSelector(handleDate);
  const [memberId] = useState(Number(localStorage.getItem("memberId")));
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
  const [timeMax, setTimeMax] = useState(startOfFiveMonthsAgo);
  const [timeMin, setTimeMin] = useState(endOfFiveMonthsAhead);
  const [detailEvent, setDetailEvent] = useState<number | string | unknown>("");
  // 쿼리세팅
  const { data: calData, refetch: refetchCal } = useQuery(
    "calendarData",
    () => readCalendar(timeMax, timeMin),
    { retry: false }
  ); // calendar API
  const queryClient = useQueryClient(); //tododrag
  const handleRefetch = () => {
    queryClient.invalidateQueries("todoData");
  }; //todo Refetch

  // 캘린더를 DragAndDrop으로 바꿉니다.
  moment.locale("ko-KR");
  const localizer = momentLocalizer(moment);
  const DragAndDropCalendar = withDragAndDrop(Calendar);
  // 캘린더용 데이터 파싱
  const myEvents = useSelector(selectEvents);
  const [formattedEvents, setFormattedEventsJunha] = useState<FormatEvent[]>(
    []
  );
  const handledate: Date = new Date(date);
  // 요일,날짜 Toolbar 변경
  const formats = {
    dateFormat: "D",
    dayFormat: "D일",
    dayRangeHeaderFormat: ({ start, end }: { start: Date; end: Date }) => {
      const startDate = moment(start).format("M월 D일");
      const endDate = moment(end).format("M월 D일");
      return `${startDate} - ${endDate}`;
    },
    // view가 month일 때 화살표 있는 쪽 년월
    monthHeaderFormat: "YYYY년 M월",
    //view가 day일 때
    dayHeaderFormat: "M월 D일 ddd",
    dayRangeFormat: ({ start, end }: { start: Date; end: Date }) => {
      const startDate = moment(start).format("M월 D일");
      const endDate = moment(end).format("M월 D일");
      return `${startDate} - ${endDate}`;
    },
  };
  // 일정 이동 기능
  const moveEvent = useCallback(
    async ({ event, start, end }: EventInteractionArgs<BigCalendarEvent>) => {
      // event 객체에서 start와 end를 제외한 속성들을 추리기
      const restEvent = Object.assign({}, event, {
        start: undefined,
        end: undefined,
      });
      // 일정변경 이동 (개발자용)
      if (start instanceof Date && end instanceof Date) {
        console.log(event, start, end);
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
      // 캘린더 이동 수정 API 요청
      if ("id" in event && "memo" in event && "colorId" in event ) {
        const new_start = new Date(start);
        const new_end = new Date(end);
        const send_id = event.id;
        const reqUpdateEvent = {
          memberId: memberId,
          event: {
            id: send_id,
            summary: event.title,
            description: event.memo,
            colorId: event.colorId,
            start: {
              dateTime: !event.allDay ? formatDateTime(new_start) : null,
              timeZone: "Asia/Seoul",
              date: event.allDay
                ? formatDateTime(new_start).split("T")[0]
                : null,
            },
            end: {
              dateTime: !event.allDay ? formatDateTime(new_end) : null,
              timeZone: "Asia/Seoul",
              date: event.allDay ? formatDateTime(new_end).split("T")[0] : null,
            },
          },
        };
        await setAuthorizationHeaderInter();
        try {
          const res = await axiosInstance.put(
            `${local_back_url}/api/calendar/v2`,
            reqUpdateEvent
          );
          // 캘린더 다시 불러오기
          console.log(" 일정 이동 기능 구글 캘린더 수정 api 요청 완료", res);
          // await refetchCal();
        } catch (error) {
          console.error("구글 캘린더 수정 에러:", error);
          return;
        }
      }
    },
    [dispatch]
  );

  // 일정 추가 모달 켜기
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    dispatch(openModal());
    const reduxselectRangeDate = {
      rangeStart: formatDateTime(start),
      rangeEnd: formatDateTime(end),
    };
    dispatch(selectRangeDate(reduxselectRangeDate));
  };

  // 일정 리사이즈 기능
  const resizeEvent = useCallback(
    async ({ event, start, end }: EventInteractionArgs<BigCalendarEvent>) => {
      // event 객체에서 start와 end를 제외한 속성들을 추리기
      const restEvent = Object.assign({}, event, {
        start: undefined,
        end: undefined,
      });
      // 일정변경 리사이즈(개발자용)
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
      // 캘린더 리사이즈 수정 API 요청
      if ("id" in event && "memo" in event && "colorId" in event) {
        const new_start = new Date(start);
        const new_end = new Date(end);
        const send_id = event.id;
        const reqUpdateEvent = {
          memberId: memberId,
          event: {
            id: send_id,
            summary: event.title,
            description: event.memo,
            colorId: event.colorId,
            start: {
              dateTime: !event.allDay ? formatDateTime(new_start) : null,
              timeZone: "Asia/Seoul",
              date: event.allDay
                ? formatDateTime(new_start).split("T")[0]
                : null,
            },
            end: {
              dateTime: !event.allDay ? formatDateTime(new_end) : null,
              timeZone: "Asia/Seoul",
              date: event.allDay ? formatDateTime(new_end).split("T")[0] : null,
            },
          },
        };
        await setAuthorizationHeaderInter();
        try {
          await axiosInstance.put(
            `${local_back_url}/api/calendar/v2`,
            reqUpdateEvent
          );
          // 캘린더 다시 불러오기
          console.log("일정 리사이즈 기능 구글 캘린더 수정 api 완료");
          // await refetchCal();
        } catch (error) {
          console.error("구글 캘린더 수정 에러:", error);
          return;
        }
      }
    },
    [dispatch]
  );

  // 일정 상세조회
  const openSideMenu = (event: BigCalendarEvent) => {
    if ("id" in event) {
      setDetailEvent(event.id);
    }
    // 상세조회할 이벤트 리덕스에 저장
    dispatch(openSideModal());
  };

  // 달력의 월을 변경시
  const handleDateChange = async (date: Date) => {
    const formDate = date.toISOString();
    dispatch(change(formDate));
    const timeMax = moment(date)
      .subtract(6, "months")
      .startOf("month")
      .toDate()
      .toISOString();
    const timeMin = moment(date)
      .add(6, "months")
      .endOf("month")
      .endOf("week")
      .toDate()
      .toISOString();
    console.log("timeMax, timeMin", timeMax, timeMin);
    // 데이터 리패치
    await setTimeMax(timeMax);
    await setTimeMin(timeMin);
    await refetchCal();
  };

  // 클릭한 일정의 정보를 받아옴
  const [currentView, setCurrentView] = useState<View | undefined>();
  const handleViewChange = (newView: View | undefined) => {
    setCurrentView(newView);
  };

  // 캘린더 데이터 리덕스에 업데이트 (준하 작업)
  useEffect(() => {
    if (calData && calData.message == "이벤트 리스트 조회 완료") {
      // 리덕스에 업데이트
      console.log("캘린더 데이터가 갱신됩니다", calData.data);
      const formattedData = calData.data.map((item: CalendarRes) => ({
        id: item.id,
        colorId: item.colorId || 6,
        allDay: item.start.date ? true : false,
        start: !item.start.date
          ? item.start.dateTime
          : item.start.date + "T00:00:00",
        end: !item.end.date ? item.end.dateTime : item.end.date + "T00:00:00",
        title: item.summary,
        memo: item.description || "",
      }));
      dispatch(setEvents(formattedData));
    }
  }, [calData]);

  // 리덕스 데이터 -> useState 데이터 받아오기 (준하 작업)
  useEffect(() => {
    if (myEvents) {
      const formattedEvents = myEvents.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }));
      setFormattedEventsJunha(formattedEvents);
      console.log(formattedEvents);
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
      //보낼 데이터
      const newStart = new Date(start);
      const newEnd = new Date(end);
      const formData = {
        memberId: memberId,
        todoId: id,
        start: {
          date: formatDateTime(newStart).split("T")[0],
          timeZone: "Asia/Seoul",
        },
        end: {
          date: formatDateTime(newEnd).split("T")[0],
          timeZone: "Asia/Seoul",
        },
      };
      await setAuthorizationHeaderInter();
      try {
        const response = await axiosInstance.post(
          `${local_back_url}/api/calendar/v2/to/event`,
          formData
        );
        // 캘린더 다시 불러오기
        const changeId = { ...newEvent };
        changeId.id = response.data.data.id;
        await dispatch(apiUpdateEvent({ before: id, after: changeId }));
        // refetchCal();
        handleRefetch();
      } catch (error) {
        console.error("투두 드래그 실패:", error);
      }
    },
    [draggedTodo, dispatch]
  );
  
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
          // eventPropGetter={eventPropGetter}
          style={{
            height: "100%",
            width: "100%",
          }}
          // Todo -> Calendar DROP 밖에서 캘린더로
          onDropFromOutside={onDropFromOutside}
          // Toolbar 커스터마이징
          components={{
            toolbar: Toolbar,
          }}
          // allDay인지에 따라서 style 변경
          // colorId에 따른 색상 변경
          eventPropGetter={(event: BigCalendarEvent) => getEventStyle(event)}
          formats={formats}
        />
      </div>
      {isOpen && <Modal refetchCal={refetchCal} />}
      {isSideOpen && <DetailModal id={detailEvent} />}
    </Container>
  );
};
export default BigCalendarInfo;

/** CSS */
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
const Container = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
  /* 일정 항목 */
  .rbc-event-content {
    margin: auto;
    width: 95%;
    font-size: 12px;
    font-family: SUITE-Regular;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6),
      -2px -2px 2px rgba(73, 73, 73, 0.2) !important;
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
      margin: auto;
      height: 100%;
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
      border-bottom: 0.1px solid #e6e6e6;
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
        border-radius: 50%;
        background-color: rgba(0, 0, 0, 0.5);
        color: #ffffff;
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
      background-color: ${colorMap[3]};
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
