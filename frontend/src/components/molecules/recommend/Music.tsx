import { useSelector } from "react-redux";
import {
  EatItemType,
  MusicItemType,
  SportItemType,
  StudyItemType,
  TripItemType,
  selectRecommends,
} from "../../../store/slice/RecommendSlice";
import { useEffect, useState } from "react";
import Recommend from "./Recommend";
import styled from "styled-components";
import showimg from "/image/showimg.svg";
import moment from "moment";
import { useQuery } from "react-query";
import { readCalendar } from "../../../api/CalendarApi";
import axiosInstance from "../../../functions/AxiosInstance";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";

export default function Music() {
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
    | []
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
        summary: items[id].title,
        colorId: null,
        start: {
          dateTime: moment(items[id].openDate, "YYYY.MM.DD")
            .toDate()
            .toISOString(),
          timeZone: "Asia/Seoul",
          date: null,
        },
        end: {
          dateTime: moment(items[id].finalDate, "YYYY.MM.DD")
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
        item.category.includes("공연")
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
          <Container className="RecommendMuscic">
            <div className="RecommendSubTitle">이런 공연/전시 어때요?</div>
            <Recommend>
              {items.map((item, index) => (
                <SliderItem key={index}>
                  <div
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
                      {isClick && isClick.index == index ? "✔" : "캘린더 추가"}
                    </button>
                    <img
                      src={item.image === "false" ? showimg : item.image}
                      alt={item.image === "false" ? showimg : ""}
                    />
                  </div>
                  <Name>{item.title}</Name>
                  <Place>{item.info}</Place>
                  <Info>
                    {item.openDate}-{item.finalDate}
                  </Info>
                </SliderItem>
              ))}
            </Recommend>
          </Container>
        </div>
      )}
    </>
  );
}

const SliderItem = styled.div`
  img {
    width: 94%;
    height: 240px;
    object-fit: cover;
    margin-bottom: 20px;
    transition: transform 0.3s ease, filter 0.3s ease;
    border: none;
    box-shadow: none;

    &:hover {
      transform: scale(1.1);
      filter: brightness(20%); /* 이미지를 조금 어둡게 만듭니다. */
    }
  }
`;

const Name = styled.p`
  font-size: 18px;
  width: 80%;
`;
const Place = styled.p`
  font-size: 15px;
  margin-top: 10px;
  width: 85%;
`;
const Info = styled.p`
  font-size: 12px;
  margin-top: 5px;
  width: 85%;
`;

const Container = styled.div`
  margin-top: -30px;
`;
