import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { closeDemoModal } from "../../store/slice/calendar/ModalSlice";
import styled, { keyframes } from "styled-components";
import { FlaskResType } from "../organisms/DemoCalendar";
import moment from "moment";
import arrowTest from "/image/arrowTest.svg";

// 모달 타입
interface FlaskModalType {
  before: string;
  after: FlaskResType[];
}

const FlaskMadal = ({ before, after }: FlaskModalType) => {
  // 기본 세팅
  const dispatch = useDispatch();
  const [itemIndex, setItemIndex] = useState<number | null>(null);
  const [beforeTxt] = useState(before);

  // 시작인덱스 설정
  useEffect(() => {
    if (after.length != 0) setItemIndex(0);
  }, [after]);

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
        <FlaskReturn>
          <Before>
            <InnerTitle>Before</InnerTitle>
            <InnerTxtBox style={{ justifyContent: "unset" }}>
              {beforeTxt.split("\n").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </InnerTxtBox>
          </Before>
          <Arrow> ⇀</Arrow>
          <After>
            <InnerTitle>After</InnerTitle>
            <PageSelect></PageSelect>
            <InnerTxtBox>
              {after && after[0] && itemIndex != null ? (
                <>
                  <Arrow2
                    onClick={() => {
                      if (itemIndex) {
                        setItemIndex(itemIndex - 1);
                      }
                    }}
                  >
                    {itemIndex ? (
                      <img
                        src={arrowTest}
                        style={{
                          width: "20px",
                          transform: "scaleX(-1)",
                          opacity: "0.5",
                        }}
                      />
                    ) : (
                      <img
                        src={arrowTest}
                        style={{
                          width: "20px",
                          transform: "scaleX(-1)",
                          opacity: "0",
                        }}
                      />
                    )}
                  </Arrow2>
                  <div>
                    <InnerTxt>
                      <SubTitle>날짜</SubTitle>
                      <SmallTxt>
                        {after[itemIndex].end.dateTime
                          ? moment(after[itemIndex].end.dateTime).format(
                              "YYYY-MM-DD hh:mm"
                            )
                          : "없음"}
                      </SmallTxt>
                    </InnerTxt>
                    <InnerTxt>
                      <SubTitle>일정</SubTitle>
                      <SmallTxt>{after[itemIndex].summary}</SmallTxt>
                    </InnerTxt>
                  </div>
                  <Arrow2
                    onClick={() => {
                      if (itemIndex != after.length - 1) {
                        setItemIndex(itemIndex + 1);
                      }
                    }}
                  >
                    {itemIndex != after.length - 1 ? (
                      <img
                        src={arrowTest}
                        style={{ width: "20px", opacity: "0.5" }}
                      />
                    ) : (
                      <img
                        src={arrowTest}
                        style={{ width: "20px", opacity: "0" }}
                      />
                    )}
                  </Arrow2>
                </>
              ) : (
                <>
                  <div>변환중 입니다</div>
                </>
              )}
            </InnerTxtBox>
          </After>
        </FlaskReturn>
        {/* <CloseMent>{timeWatch}초 후 창이 닫힙니다.</CloseMent> */}
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
  font-size: 0px;
  color: white;
`;
const PageSelect = styled.div`
  display: flex;
  justify-content: space-around;
  div {
    width: 30%;
  }
  button {
    width: 100% !important;
    font-size: 10px;
    padding: 1 1 1 1 !important;
    text-align: center;
  }
`;
const InnerTitle = styled.div`
  font-size: 24px;
  margin-top: 20px;
  font-weight: 900;
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
  color: white;
`;
const Arrow2 = styled.div`
  font-size: 40px;
  cursor: pointer;
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
  background-color: white;
  min-height: 300px;
  /* box-shadow: 5px 5px 20px #a86c6c, -5px -5px 20px #7575b9,
    -5px 5px 20px #75b98a, 5px -5px 20px #b8b975; */
`;
const Before = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  margin: 20px;
  width: 50%;
  /* border: 1px solid black; */
  background-color: white;
  border-radius: 20px;
  min-height: 300px;
  box-shadow: 1px 1px 4px #878585, -1px -1px 4px #878585;
  max-height: 400px;
`;
const InnerTxtBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 60%;
  border-radius: 20px;
  /* box-shadow: inset 2px 2px 5px #878585, inset -2px -2px 5px #878585; */
  font-size: 17px;
  text-align: center;
  margin: auto;
  height: 70%;
  overflow: hidden;
  overflow-wrap: ellipsis;

  span {
    height: 100%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2px !important;
    padding: 2px;
  }
`;
const InnerTxt = styled.div`
  margin: 10px;
`;

const SubTitle = styled.div`
  font-size: 20px;
`;
const SmallTxt = styled.div`
  font-weight: 100 !important;
  font-size: 15px;
  /* color: #6c6c6c; */
`;
const Overlay = styled.div`
  font-family: SUITE-Regular;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  transition: background-color 0.3s ease;
`;

const InputModalContainer = styled.div`
  animation: ${fadeIn} 0.2s ease-in;
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
  /* background-color: white; */
  border-radius: 7px;
  /* box-shadow: 5px 5px 20px #525252, -5px -5px 20px #525252; */
  overflow: hidden;
  transition: 0.3s ease-out;
  button {
    margin-top: 10px;
    background-color: #515151;
    color: #eee;
  }
`;
