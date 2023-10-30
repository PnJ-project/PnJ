// 홈페이지
// import React from "react";
import plogo from "../assets/main.svg";
import UseDemo from "../components/atoms/UseDemo";
import GoogleLogin from "../components/atoms/GoogleLogin";
import styled from "styled-components";
export default function Main() {
  // const clientId: string = process.env.GOOGLE_CLIENT_ID!;

  return (
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
            <UseDemo />
            <GoogleLogin />
          </Btns>
        </TextDiv>
        <LogoImg src={plogo} alt="PnJ LOGO" />
      </Container>
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
  padding-left: 40px;
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
// SSR - 초기 데이터 불러오기
/*
export async function getServerSideProps() {
  try {
    const response = await axios.get(""); // 요청할 엔드포인트에 맞게 수정하세요.
    const results = response.data; // 받아온 데이터를 results에 할당합니다.

    return {
      props: { results }, // props를 통해 페이지에 데이터를 전달합니다.
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { results: null }, // 에러가 발생한 경우에도 props를 전달합니다.
    };
  }
}
*/
