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
                  <Span>음성과 텍스트</Span>로
                </div>
                혁신적인 일정관리를 경험해보세요
              </Title>
              <Content>innovatory Experience schedule management</Content>
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
  height: 90vh;
`;
const TextDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  margin-top: auto;
  padding-left: 60px;
`;
const Title = styled.div`
  font-family: TheJamsil5;
  font-size: 50px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
const Span = styled.span`
  color: #00900e;
`;
const Content = styled.div`
  color: #000;
  font-family: SUITE-Regular;
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
`;
const LogoImg = styled.img`
  padding-right: 40px;
`;
