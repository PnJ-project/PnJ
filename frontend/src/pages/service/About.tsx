// 서비스 소개 페이지
import styled from "styled-components";
import pnjLogo from "/image/pnjLogo.svg";
import { PiNumberCircleOneBold } from "react-icons/pi";
import { PiNumberCircleTwoBold } from "react-icons/pi";
import { PiNumberCircleThreeBold } from "react-icons/pi";

export default function About() {
  return (
    <Container>
      <Box>
        <LogoImg src={pnjLogo} />
        <Title>서비스 사용방법</Title>
      </Box>

      <Step>
        <PiNumberCircleOneBold
          style={{ verticalAlign: "middle", fontSize: "27px" }}
        />{" "}
        일정 입력 칸에 음성과 텍스트로 일정을 입력해보세요!
      </Step>
      <Detail>예) 6월 12일에 지영이 생일파티, 내일 언니랑 제주도가</Detail>
      <Detail>
        👀 날짜가 있는 일정은 캘린더로 바로 쏙! <br />
        날짜가 없다면 할일목록으로 쏘옥!
      </Detail>

      <Step>
        <PiNumberCircleTwoBold
          style={{ verticalAlign: "middle", fontSize: "27px" }}
        />{" "}
        할일목록으로 일정이 들어갔다면, 언제든지 캘린더로 일정을 옮길 수 있어요~
      </Step>
      <Detail>👀 할일을 캘린더로 드래그 해보세요!</Detail>
      <Step>
        <PiNumberCircleThreeBold
          style={{ verticalAlign: "middle", fontSize: "27px" }}
        />{" "}
        캘린더에서도 일정을 손쉽게 수정해봐요~
      </Step>
      <Detail>👀 수정을 원하는 일정을 클릭하거나 드래그해보세요!</Detail>
    </Container>
  );
}

/** CSS */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 9%;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  font-size: 22px;
  margin-bottom: 20px;
  color: rgb(0, 0, 0);
`;

const Step = styled.p`
  font-size: 19px;
  margin-top: 10px;
  margin-bottom: 5px;
  color: rgb(32, 127, 28);
`;
const Detail = styled.p`
  font-size: 15px;
  margin-bottom: 10px;
  color: #000000;
`;

const LogoImg = styled.img`
  width: 130px;
  height: 60px;
`;
