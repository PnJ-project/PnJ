// 추천페이지 - 카테고리보기 (스포츠)
import { useSelector } from "react-redux";
import {
  EatItemType,
  MusicItemType,
  SportItemType,
  StudyItemType,
  TripItemType,
  selectRecommends,
} from "../../../store/slice/RecommendSlice";
import { useState, useEffect } from "react";
import SportsRecommend from "./SportsRecommend";
import styled from "styled-components";
import moment from "moment";
import { useQuery } from "react-query";
import { readCalendar } from "../../../api/CalendarApi";
import axiosInstance from "../../../functions/AxiosInstance";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";

export default function Sports() {
  // 기본 세팅
  const recommends = useSelector(selectRecommends);
  const [isClick, setIsClick] = useState({
    boolean: false,
    index: -1,
  });
  const [categoryHover, setCategoryHover] = useState({
    boolean: false,
    index: -1,
  });
  const [items, setItems] = useState<
    | TripItemType[]
    | StudyItemType[]
    | EatItemType[]
    | MusicItemType[]
    | SportItemType[]
  >([]);
  const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;
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
  const [timeMax] = useState(startOfFiveMonthsAgo);
  const [timeMin] = useState(endOfFiveMonthsAhead);
  // 쿼리세팅
  const { refetch: refetchCal } = useQuery(
    "calendarData",
    () => readCalendar(timeMax, timeMin),
    { retry: false }
  ); // calendar API

  // 캘린더 추가
  const handleAddEvent = async (id: number) => {
    const reqNewEvent = {
      memberId: memberId,
      event: {
        id: null,
        summary: `(${items[id].categoryName}) ${items[id].awayTeamName} vs ${items[id].homeTeamName}`,
        colorId: null,
        start: {
          dateTime: moment(items[id].gameDateTime, "YYYY.MM.DD")
            .toDate()
            .toISOString(),
          timeZone: "Asia/Seoul",
          date: null,
        },
        end: {
          dateTime: moment(items[id].gameDateTime, "YYYY.MM.DD")
            .toDate()
            .toISOString(),
          timeZone: "Asia/Seoul",
          date: null,
        },
      },
    };
    await setAuthorizationHeaderInter();
    try {
      const response = await axiosInstance.post(
        `${local_back_url}/api/calendar/v2`,
        reqNewEvent
      );
      // 캘린더 다시 불러오기
      setIsClick({ boolean: true, index: id });
      console.log("구글 캘린더 생성 완료", response);
      await refetchCal();
    } catch (error) {
      console.error("구글 캘린더 생성 에러:", error);
      return;
    }
  };

  // 정보 추리기
  useEffect(() => {
    setIsClick({ boolean: false, index: -1 });
    if (recommends) {
      // "category": "공연, 뮤지컬, 콘서트"를 만족하는 아이템 필터링
      const filteredItems = recommends.filter((item) =>
        item.category.includes("스포츠")
      );
      setItems(filteredItems);
    }
  }, [recommends]);

  // 정보없을시
  if (!recommends) {
    return (
      <>
        <div>로딩중입니다.</div>
      </>
    );
  }
  return (
    <>
      {items.length > 0 && (
        <div className="RecommendInner">
          <div className="RecommendSports">
            <div className="RecommendSubTitle">당신이 궁금한 스포츠 일정</div>

            <Container>
              <SportsRecommend>
                {items.map((item, index) => (
                  <SliderItem key={index}>
                    <ImageContainer
                      onMouseEnter={() =>
                        setCategoryHover({
                          boolean: true,
                          index: index,
                        })
                      }
                      onMouseLeave={() =>
                        setCategoryHover({
                          boolean: false,
                          index: -1,
                        })
                      }
                    >
                      <button
                        className={`CategoryAdd ${
                          categoryHover.boolean && categoryHover.index == index
                            ? "CategoryAddActive"
                            : ""
                        }`}
                        onClick={() => {
                          handleAddEvent(index);
                        }}
                      >
                        {isClick && isClick.index == index
                          ? "✔"
                          : "캘린더 추가"}
                      </button>
                      <Img src={item.awayTeamEmblemUrl} alt={item.category} />
                      <DetailContainer>
                        <Name>{item.league}</Name>
                        <Info>
                          {item.awayTeamName} vs {item.homeTeamName}
                        </Info>
                        <When>{item.gameDate}</When>
                      </DetailContainer>
                      <Img src={item.homeTeamEmblemUrl} alt={item.category} />
                    </ImageContainer>
                  </SliderItem>
                ))}
              </SportsRecommend>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

/** CSS */
const SliderItem = styled.div`
  background-color: rgb(243, 250, 255);
  border-radius: 10px;
  transition: transform 0.3s ease, filter 0.3s ease;

  img {
    height: 180px;
    object-fit: cover;
    margin-bottom: 10px;
    transition: transform 0.3s ease, filter 0.3s ease;
    margin: 10px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img``;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.p`
  font-size: 18px;
`;

const When = styled.p`
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
`;
const Info = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;
