import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeDemoModal } from "../../store/slice/calendar/ModalSlice";
import styled, { keyframes } from "styled-components";
import { FlaskResType } from "../organisms/DemoCalendar";
import moment from "moment";

// 모달 타입
interface FlaskModalType {
  before: string;
  after: FlaskResType[];
}

const FlaskMadal = ({ before, after }: FlaskModalType) => {
  // 기본 세팅
  const dispatch = useDispatch();
  const [beforeTxt] = useState(before);
  const [timeWatch, setTimeWatch] = useState(100);
  // const exampledummy = [
  //   {
  //     end: { dateTime: "2023-11-15T16:02:11", timeZome: "Asia/Seoul" },
  //     start: { dateTime: "2023-11-15T15:02:11", timeZome: "Asia/Seoul" },
  //     summary: "나저녁약속",
  //   },
  // ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeWatch((prevTime) => prevTime - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      dispatch(closeDemoModal());
    }, 100000);

    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, [dispatch]);

  return (
    <Overlay
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          dispatch(closeDemoModal());
        }
      }}
    >
      <InputModalContainer>
        <CloseBtn
          onClick={() => {
            dispatch(closeDemoModal());
          }}
        >
          ✖
        </CloseBtn>
        <Title>간편 일정 등록 결과 조회</Title>
        <div>사용설명: 긴 텍스트속의 일정을 입력 한번으로 간편하게 정리!</div>
        <FlaskReturn>
          <Before>
            <InnerTitle>보낸 일정</InnerTitle>
            <InnerTxtBox>{beforeTxt}</InnerTxtBox>
          </Before>
          <Arrow> ➜</Arrow>
          <After>
            <InnerTitle>정리된 일정</InnerTitle>
            <InnerTxtBox>
              {after[0] ? (
                <>
                  <div>
                    분류 :
                    {`${after[0].end.dateTime === null ? "투두" : "캘린더"}`}
                  </div>
                  <div>
                    날짜 :{" "}
                    {after[0].end.dateTime
                      ? moment(after[0].end.dateTime).format("YYYY-MM-DD hh:mm")
                      : "없음"}
                  </div>
                  <div>일정 : {after[0].summary}</div>
                </>
              ) : (
                <>
                  <div>변환중 입니다</div>
                </>
              )}
            </InnerTxtBox>
          </After>
        </FlaskReturn>
        <CloseMent>{timeWatch}초 후 창이 닫힙니다.</CloseMent>
      </InputModalContainer>
    </Overlay>
  );
};

export default FlaskMadal;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const CloseBtn = styled.div`
  cursor: pointer;
`;
const Title = styled.div`
  font-size: 32px;
  margin: 20px;
`;
const InnerTitle = styled.div`
  font-size: 24px;
  margin-top: 20px;
`;
const CloseMent = styled.div`
  margin-bottom: 20px;
`;
const FlaskReturn = styled.div`
  display: flex;
  justify-content: space-around;
  width: 60vw;
  margin: 30px;
`;
const Arrow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 60px;
`;
const After = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin: 20px;
  width: 50%;
  font-size: 20px;
  /* border: 1px solid black; */
  border-radius: 20px;
  min-height: 300px;
  box-shadow: 4px 4px 10px #a86c6c, -4px -4px 10px #7575b9,
    -4px 4px 10px #75b98a, 4px -4px 10px #b8b975;
`;
const Before = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin: 20px;
  width: 50%;
  /* border: 1px solid black; */
  border-radius: 20px;
  min-height: 300px;
  box-shadow: 2px 2px 10px #878585, -2px -2px 10px #878585;
`;
const InnerTxtBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px;
  padding: 20px;
  width: 50%;
  height: 50%;
  /* border: 1px solid black; */
  border-radius: 20px;
  /* box-shadow: inset 2px 2px 5px #878585, inset -2px -2px 5px #878585; */
`;
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

const InputModalContainer = styled.div`
  animation: ${fadeIn} 0.2s ease-in;
  font-family: HSSaemaul-Regular;
  position: fixed;
  padding: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 150;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 7px;
  box-shadow: 5px 5px 20px #525252, -5px -5px 20px #525252;
  overflow: hidden;
  transition: 0.3s ease-out;
  button {
    margin-top: 10px;
    background-color: #515151;
    color: #eee;
  }
`;
