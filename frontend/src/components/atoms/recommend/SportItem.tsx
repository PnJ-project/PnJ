// 스포츠 아이템
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { readCalendar } from "../../../api/CalendarApi";
import { TripItemType } from "../../../store/slice/RecommendSlice";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";
import axiosInstance from "../../../functions/AxiosInstance";

export default function SportItem({ item }: { item: TripItemType }) {
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
      summary: `${item.awayTeamName} vs ${item.homeTeamName}`,
      colorId: null,
      start: {
        dateTime: item.gameDateTime,
        timeZone: "Asia/Seoul",
        date: null,
      },
      end: {
        dateTime: item.gameDateTime,
        timeZone: "Asia/Seoul",
        date: null,
      },
    },
  };
  const recommendCalendar = async () => {
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
      {/* 이미지 */}
      <div className="SportImgBox">
        <img src={item.awayTeamEmblemUrl}></img>
        <div>VS</div>
        <img src={item.homeTeamEmblemUrl}></img>
      </div>
      {/* 내용물 */}
      <div className="RecommendItemShow">
        <div className="SportTitle">{item.categoryName}</div>
        <div className="SportTime">{item.title}</div>
        <div className="SportSubTitle">
          {item.statusCode != "RESULT" ? (
            <>
              {item.awayTeamName} VS {item.homeTeamName}
            </>
          ) : (
            <>
              {item.awayTeamName}
              {item.awayTeamScore} : {item.homeTeamName}
              {item.homeTeamScore}
            </>
          )}
        </div>
        <div className="SportTime">
          {item.statusCode != "RESULT" ? (
            <>
              <div className="SportTime">{item.gameDate}</div>
              <div className="SportTime">
                {item.gameDateTime.split("T")[1].slice(0, 5)}
              </div>
            </>
          ) : (
            <>
              <div className="SportTime">경기종료</div>
            </>
          )}
        </div>
        {/* 버튼 */}
        {item.statusCode != "RESULT" && (
          <div className="RecommendBtnBox">
            <button className="RecommendAddBtn" onClick={recommendCalendar}>
              캘린더 추가
            </button>
          </div>
        )}
      </div>
    </>
  );
}
