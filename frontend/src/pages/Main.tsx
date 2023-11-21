// 메인 페이지 - 캘린더 + 추천
import { scroller } from "react-scroll";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "../components/organisms/ApiCalendar";
import Recommend from "../components/organisms/Recommend";
import {
  selectIsRecommend,
  setRecommendFalse,
} from "../store/slice/ToggleSlice";
import styled from "styled-components";

export default function Main() {
  // 기본세팅
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [, setScrollIndex] = useState(0); // 스크롤 위치
  const isRecommend = useSelector(selectIsRecommend); // 추천 토글

  // 로그아웃시 리다이렉트
  useEffect(() => {
    if (!localStorage.getItem("memberId")) {
      navigate("/demo");
    }
  }, []);

  // 페이지가 로드될 때 스크롤 위치를 맨 위로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // 추천 버튼 누를시
  useEffect(() => {
    if (isRecommend) {
      scroller.scrollTo("recommand", {
        smooth: true,
        duration: 800,
      });
      setScrollIndex(1);
      setTimeout(() => {
        dispatch(setRecommendFalse());
      }, 200);
    }
  }, [isRecommend]);

  return (
    <>
      {/* CSS 설정 */}
      <BackGround />

      {/* 캘린더 부 */}
      <div id="calendar">
        <Calendar />
      </div>

      {/* 중간 띄우기 */}
      <Middle />

      {/* 추천 부 */}
      <div id="recommand">
        <Recommend />
      </div>
    </>
  );
}

/** CSS */
const BackGround = styled.div`
  display: flex;
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  background-color: #36513d;
  background-image: #36513d;
  z-index: -1;
`;
const Middle = styled.div`
  height: 0vh;
  background: linear-gradient(to bottom, #36513d, #ffffff);
`;
