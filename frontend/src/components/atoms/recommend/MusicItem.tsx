// 공연 아이템
import { useState } from "react";
import { useQuery } from "react-query";
import { TripItemType } from "../../../store/slice/RecommendSlice";
import { readCalendar } from "../../../api/CalendarApi";
import moment from "moment";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";
import axiosInstance from "../../../functions/AxiosInstance";

export default function MusicItem({ item }: { item: TripItemType }) {
  // 기본 세팅
  const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;
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
  const [timeMax] = useState(startOfFiveMonthsAgo);
  const [timeMin] = useState(endOfFiveMonthsAhead);
  // 쿼리세팅
  const { refetch: refetchCal } = useQuery(
    "calendarData",
    () => readCalendar(timeMax, timeMin),
    { retry: false }
  ); // calendar API

  // 캘린더 추가시
  const reqNewEvent = {
    event: {
      id: null,
      summary: item.title,
      colorId: null,
      start: {
        dateTime: moment(item.openDate, "YYYY.MM.DD").toDate().toISOString(),
        timeZone: "Asia/Seoul",
        date: null,
      },
      end: {
        dateTime: moment(item.finalDate, "YYYY.MM.DD").toDate().toISOString(),
        timeZone: "Asia/Seoul",
        date: null,
      },
    },
  };
  const recommendCalendar = async () => {
    console.log(reqNewEvent);
    await setAuthorizationHeaderInter();
    try {
      const response = await axiosInstance.post(
        `${local_back_url}/api/calendar/v2`,
        reqNewEvent
      );
      // 캘린더 다시 불러오기
      console.log("구글 캘린더 생성 완료", response);
      await refetchCal();
    } catch (error) {
      console.error("구글 캘린더 생성 에러:", error);
      return;
    }
  };

  return (
    <>
      <img src={item.image}></img>
      {/* 내용물 */}
      <div className="RecommendItemShow">
        <div className="MusicTitle">{item.title}</div>
        <div>장르 : {item.categoryName}</div>
        {item.info != "false" && item.info && (
          <div className="MusicSub">{item.info}</div>
        )}
        <div className="MusicSub">
          {item.openDate} ~ {item.finalDate}
        </div>
        {/* 버튼 */}
        <div className="RecommendBtnBox">
          <button className="RecommendAddBtn" onClick={recommendCalendar}>
            캘린더 추가
          </button>
        </div>
      </div>
    </>
  );
}
