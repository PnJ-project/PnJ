// 홈페이지
// 데모버튼을 누를시 컴포넌트가 체인지됩니다. 홈버튼 누르면 다시 원래대로 돌아갑니다
// import React from "react";
import plogo from "../assets/main.svg";
import UseDemo from "../components/atoms/UseDemo";
import GoogleLogin from "../components/atoms/GoogleLogin";
import DemoCalendar from "../components/organisms/DemoCalendar";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { setDemoTrue } from "../store/slice/ToggleSlice";
import { RootState } from "../store/store";

export default function Main() {
  // 기본세팅
  const dispatch = useDispatch();
  const useDemoVisible = useSelector(
    (state: RootState) => state.toggle.isUseDemo
  );
  // 데모버튼 클릭시
  const handleDemo = () => {
    dispatch(setDemoTrue());
  };
  return (
    <>
      {/* 메인 페이지 부 */}
      {!useDemoVisible && (
        <>
          <Container>
            <TextDiv>
              <Title>
                <div>
                  정리되지않은
                  <div>
                    <Span>음성 및 텍스트</Span>를
                  </div>
                </div>
                <div>간단한 일정으로 정리</div>
                {/* 혁신적인 일정관리를 경험해보세요 */}
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
          </Container>
        </>
      )}
      {/* 캘린더 부 */}
      {useDemoVisible && (
        <>
          <DemoCalendar />
        </>
      )}
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  height: 100vh;
  background-color: white;
  /* background-image: linear-gradient(to bottom, #22313f, #f4f4f4); */
  /* background-image: linear-gradient(to bottom, #22313f 70%, #f4f4f4); */
  /* background-image: linear-gradient(to bottom, #22313f 70%, #f4f4f4); */
  /* background-image: linear-gradient(176deg, #aacfb3 70%, #f4f4f4 70%); */
  background-image: linear-gradient(
    176deg,
    #36513d 80%,
    #f4f4f4 calc(80% + 2px)
  );
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
const LogoImg = styled.img`
  padding-right: 40px;
  height: 80%;
  margin: auto;
  animation: moveUpDown 2s ease-in-out infinite alternate;
  @keyframes moveUpDown {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(-10px);
    }
  }
`;
