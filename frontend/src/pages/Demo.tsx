// 데모 페이지
import plogo from "../assets/main.svg";
import UseDemo from "../components/atoms/UseDemo";
import DownArrow from "../components/atoms/DownArrow";
import GoogleLogin from "../components/atoms/GoogleLogin";
import DemoCalendar from "../components/organisms/DemoCalendar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setDemoTrue } from "../store/slice/ToggleSlice";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import { useNavigate } from "react-router-dom";

export default function Demo() {
  // 기본세팅
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isScrolling, setIsScrolling] = useState(false);
  const useDemoVisible = useSelector(
    (state: RootState) => state.toggle.isUseDemo
  );
  // 로그인시 리다이렉트
  useEffect(() => {
    if (localStorage.getItem("memberId")) {
      navigate("/");
    }
  }, []);

  // 데모버튼 클릭시
  const handleDemo = () => {
    dispatch(setDemoTrue());
    scroller.scrollTo("calendar", {
      smooth: true,
      duration: 800,
    });
  };

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
          dispatch(setDemoTrue());
          scroller.scrollTo("calendar", {
            smooth: true,
            duration: 800,
          });
        }
      } else {
        // 마우스 휠을 위로 스크롤할 때
        const currentScrollPos = window.scrollY;
        if (currentScrollPos >= 100) {
          scroller.scrollTo("top", {
            smooth: true,
            duration: 800,
          });
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
    window.removeEventListener("wheel", handleWheel);
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [isScrolling]);

  return (
    <>
      <BackGround></BackGround>
      {/* 메인 페이지 부 */}
      <div id="top">
        <Container>
          <TextDiv>
            <Title>
              <div>
                정리되지 않은
                <div>
                  <Span>음성 및 텍스트</Span>를
                </div>
              </div>
              <div>간단한 일정으로 정리</div>
            </Title>
            <EngBox>
              <EngDeco></EngDeco>
              <Content>Innovatory Experience schedule management</Content>
            </EngBox>
            <Btns>
              <div onClick={handleDemo}>
                <UseDemo />
              </div>
              <GoogleLogin />
            </Btns>
          </TextDiv>
          <LogoImg src={plogo} alt="PnJ LOGO" />
          <DownBtn>
            <DownArrow />
          </DownBtn>
        </Container>
      </div>

      {/* 캘린더 부 */}
      <div id="calendar">
        {useDemoVisible && (
          <>
            <DemoCalendar />
          </>
        )}
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
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin: auto;
  padding-left: 60px;
  min-width: 450px;
  /* text-shadow: 1px 1px 1px white; */
  color: white;
`;
const Title = styled.div`
  font-family: TheJamsil5;
  font-size: 40px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  div {
    margin-bottom: 10px;
  }
`;
const EngBox = styled.div`
  display: flex;
`;
const EngDeco = styled.div`
  border-left: 5px solid #b5ff3f;
  margin-right: 8px;
`;
const Span = styled.span`
  font-size: 60px;
  color: #b5ff3f;
  /* text-shadow: 2px 2px 2px #000000, -1px -1px 1px #ffffff; */
`;
const Content = styled.div`
  color: #fbfbfb;
  font-family: TheJamsil5;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
`;
const Btns = styled.div`
  display: flex;
  flex-direction: column;
  width: 295px;
  gap: 10px;
  border-radius: 4px;
  div {
    font-family: TheJamsil5;
  }
`;
const DownBtn = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const LogoImg = styled.img`
  padding-right: 40px;
  height: 80%;
  margin: auto;
  animation: moveUpDown 2s ease-in-out infinite alternate;
  @keyframes moveUpDown {
    from {
      transform: translateY(10px);
    }
    to {
      transform: translateY(-10px);
    }
  }
`;
