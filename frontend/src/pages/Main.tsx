// 데모 페이지
import Calendar from "../components/organisms/ApiCalendar";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import Recommend from "../components/organisms/Recommend";
import { useNavigate } from "react-router-dom";

export default function Main() {
  // 기본세팅
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollIndex, setScrollIndex] = useState(0);
  const navigate = useNavigate();
  // 로그아웃시 리다이렉트
  useEffect(() => {
    if (!localStorage.getItem("memberId")) {
      navigate("/demo");
    }
  }, []);

  // 휠 이벤트
  const resetWheel = () => {
    setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };
  const handleWheel = (event: WheelEvent) => {
    if (!isScrolling) {
      const delta = Math.sign(event.deltaY); // 마우스 휠 방향을 확인하기 위한 값
      setIsScrolling(true);
      if (delta > 0) {
        // 마우스 휠을 아래로 스크롤할 때
        const currentScrollPos = window.scrollY;
        if (currentScrollPos < 5) {
          scroller.scrollTo("recommand", {
            smooth: true,
            duration: 800,
          });
          setScrollIndex(1);
        }
      } else {
        // 마우스 휠을 위로 스크롤할 때
        const currentScrollPos = window.scrollY;
        if (currentScrollPos >= 100) {
          scroller.scrollTo("calendar", {
            smooth: true,
            duration: 800,
          });
          setScrollIndex(0);
        }
      }
      resetWheel();
    } else {
      event.preventDefault();
    }
  };

  // 최상단 이동
  useEffect(() => {
    // 페이지가 로드될 때 스크롤 위치를 맨 위로 이동
    window.scrollTo(0, 0);
  }, []);

  // 스크롤 이벤트 부여
  useEffect(() => {
    // 마우스 휠 이벤트 추가
    if (scrollIndex == 1) {
      return;
    }
    window.removeEventListener("wheel", handleWheel);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isScrolling]);

  // 추천 페이지 진입시 이벤트 제거
  useEffect(() => {
    if (scrollIndex == 1) {
      window.removeEventListener("wheel", handleWheel);
    }
    if (scrollIndex == 0) {
      window.removeEventListener("wheel", handleWheel);
      window.addEventListener("wheel", handleWheel, { passive: false });
    }
  }, [scrollIndex]);

  // 캘린더 재진입시
  useEffect(() => {
    const currentScrollPos = window.scrollY;
    const recommendationStart =
      document.getElementById("recommand")?.getBoundingClientRect().top || 0;
    if (currentScrollPos < recommendationStart) {
      setScrollIndex(0);
    }
  }, [window.scrollY]);

  return (
    <>
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
    #dddddd calc(80% + 2px)
  );
  z-index: -1;
`;
