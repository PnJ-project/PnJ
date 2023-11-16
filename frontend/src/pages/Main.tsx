// 데모 페이지
import Calendar from "../components/organisms/ApiCalendar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import Recommend from "../components/organisms/Recommend";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsRecommend } from "../store/slice/ToggleSlice";

export default function Main() {
  // 기본세팅
  const [, setScrollIndex] = useState(0);
  const navigate = useNavigate();
  const isRecommend = useSelector(selectIsRecommend);
  // 로그아웃시 리다이렉트
  useEffect(() => {
    if (!localStorage.getItem("memberId")) {
      navigate("/demo");
    }
  }, []);

  // 최상단 이동
  useEffect(() => {
    // 페이지가 로드될 때 스크롤 위치를 맨 위로 이동
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
    }
  }, [isRecommend]);

  return (
    <>
      {/* CSS 설정 */}
      <BackGround></BackGround>

      {/* 메인 페이지 부 */}
      <div id="top"></div>

      {/* 캘린더 부 */}
      <div id="calendar">
        <Calendar />
      </div>

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
  background-color: white;
  background-image: linear-gradient(
    176deg,
    #36513d 80%,
    #ffffff calc(80% + 2px)
  );
  z-index: -1;
`;
