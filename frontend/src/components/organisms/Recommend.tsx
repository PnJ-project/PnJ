import "./Recommend.css";
import UpBtn from "../atoms/UpBtn";
import { useQuery } from "react-query";
import { readRecommend } from "../../api/RecommendApi";
import moment from "moment";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectEvents } from "../../store/slice/calendar/CalendarSlice";
import { useDispatch } from "react-redux";
import { setRecommend } from "../../store/slice/RecommendSlice";
import Music from "../molecules/recommend/Music";
import Sports from "../molecules/recommend/Sports";
import Study from "../molecules/recommend/Study";
import Trip from "../molecules/recommend/Trip";
import Eat from "../molecules/recommend/Eat";
import All from "../molecules/recommend/All";
import grid from "/image/grid.svg";
import list from "/image/list.svg";
import RecommendJ from "/image/RecommendJ.svg";
import styled from "styled-components";

export default function Recommend() {
  // 기본 세팅
  const dispatch = useDispatch();
  const [sortCategoey, setSortCategory] = useState(true);
  const memberId = localStorage.getItem("memberId");
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
  const [timeMax] = useState(endOfFiveMonthsAhead);
  const [timeMin] = useState(startOfFiveMonthsAgo);
  const allEvents = useSelector(selectEvents);

  // 쿼리관리
  const { data: recommendData, refetch: refetchRecommend } = useQuery(
    "recommendData",
    () =>
      readRecommend({
        memberId: memberId ? memberId : "",
        timeMax: timeMax,
        timeMin: timeMin,
      }),
    {
      enabled: false,
      retry: false,
    }
  ); // recommend API

  // 추천리스트 리덕스 저장
  useEffect(() => {
    if (recommendData) {
      console.log("추천 아이템을 리덕스에 저장", recommendData.data);
      if (recommendData.data[0] == "일정을 추가해 보세요") {
        return;
      }
      dispatch(setRecommend(recommendData.data));
    }
  }, [recommendData]);

  // 일정에 변동이 있을시 추천 아이템 리패치
  useEffect(() => {
    refetchRecommend();
  }, [allEvents]);

  return (
    <>
      {/* 기능 */}
      <UpBtn howscroll={200} />
      {/* 본문 */}
      <div className="RecommendContainer">
        <Box className="RecommendTitle">
          당신을 위한
          <Img src={RecommendJ} />의 일정 추천
        </Box>
        <div className="RecommendSortBtnBox">
          <button
            onClick={() => {
              setSortCategory(true);
            }}
          >
            <img src={list} alt="" style={{ width: "35px" }} />
          </button>
          <button
            onClick={() => {
              setSortCategory(false);
            }}
          >
            <img src={grid} alt="" style={{ width: "30px" }} />
          </button>
        </div>
        {/* 카테고리 보기 */}
        {sortCategoey && (
          <>
            <div className="RecommendBox">
              <Music />
              <Sports />
              <Study />
              <Trip />
              <Eat />
            </div>
          </>
        )}
        {/* 갤러리 보기 */}
        {!sortCategoey && (
          <>
            <div className="RecommendAllBox">
              <All />
            </div>
          </>
        )}
        {/* 푸터 */}
        <div className="RecommendFooter">
          <hr />
        </div>
      </div>
    </>
  );
}

const Img = styled.img`
  width: 50px;
  height: 50px;
  /* margin-top: 50px; */
`;
const Box = styled.div``;
