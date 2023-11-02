import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import moment from "moment";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { change } from "../../store/slice/calendar/HandleSlice";

// import React from 'react';
export default function SmallCal() {
  const localizer = momentLocalizer(moment);
  const dispatch = useDispatch();
  const [, setHandleDate] = useState<Date>();

  const handleDateChange = (date:Date) => {
    console.log(date);
    setHandleDate(date);
    const formDate = date.toISOString()
    dispatch(change(formDate))
  };
  //클릭한 view의 정보를 받아옴
  const [, setCurrentView] = useState('');
  const handleViewChange = (newView:string) => {
    setCurrentView(newView);
  };

  return (
    <Container>
      <div className="leftArticle">
        <Calendar
          localizer={localizer}
          style={{ width: "100%", height: '100%' }}
        //   components={{ toolbar: ToolbarMini }}
          view="month"
          defaultView="month"
          //클릭한 date날짜를 가져옴
          onNavigate={handleDateChange}
          //클릭 한 view 의 유형을 가져옴
          onView={handleViewChange}
        />
      </div>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  overflow: hidden;
  height:100%;
  span:nth-child(1) {
    button{
      font-size:7px;
      padding: 0;
      height:10%
    }
  }
  span:nth-child(2) {
    font-size:12px;
  }
  span:nth-child(3) {
    display: none;
  }
  // 일(일주일) 전체
  .rbc-date-cell {
    text-align: center;
    font-size:8px;
    .rbc-button-link {
      //오늘날짜말고 다른 거 다 포함 일자 높이
      height:25px; 
      font-size:5px;
    }
  }
  // BigCalendar
  .leftArticle {
    width: 100%;
    height: 100%;
    .rbc-month-view{
      height:80%;
      flex:unset;
    }
    // 헤더랑 월 이름 박스
    .rbc-toolbar{
      height: 20%;
      margin-bottom: 0;
    }
    .rbc-row.rbc-month-header {
      height: 8%;
      font-size:8px;
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
        align-items:center;
        justify-content:center;
        margin:auto;
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
