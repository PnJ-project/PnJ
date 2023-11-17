import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  setBeforeTutorial,
  setAfterTutorial,
  setTutorialEnd,
} from "../../store/slice/Tutorial";
import tutorialLogo from "/image/tutorial1.svg";
import styled from "styled-components";

export default function DemoTutorialBox() {
  // 기본 세팅
  const dispatch = useDispatch();
  const index = useSelector((state: RootState) => state.tutorial.indexTutorial);
  const tutorialIndex = useSelector(
    (state: RootState) => state.tutorial.indexTutorial
  ); // 튜토리얼 인덱스
  return (
    <>
      <div
        className={`TutorialInfo ${tutorialIndex == 3 && "TutorialInfo3"} ${
          tutorialIndex == 7 && "TutorialInfo7"
        } ${tutorialIndex == 6 && "TutorialInfo6"} ${
          tutorialIndex == 5 && "TutorialInfo5"
        }`}
      >
        <div className="TutorialDetail">
          <img
            src={tutorialLogo}
            alt=""
            style={{ width: "100px", cursor: "pointer" }}
          />
          {tutorialIndex == 1 && (
            <Container>
              <StepTitle className="TutorialBold">입력창을 통해</StepTitle>
              <div className="TutorialBold">일정을 등록해보세요</div>
              <StepDetail className="T1Txt">
                <p>1{")"} 내일 떡볶이먹기</p>
                <p>2{")"} 16일 ~ 19일에 스키장</p>
                <p>3{")"} 11/30까지 자소서</p>
                <p>4{")"} 나 15일 저녁 약속 있음</p>
              </StepDetail>
              <StepDetail>
                <div className="TutorialBold TutorialRed">주의 ⚠</div>
                <div className="Tutorial1Sub">
                  <div>여러 일정은</div>
                  <div>shift + enter로 구분</div>
                </div>
              </StepDetail>
            </Container>
          )}
          {tutorialIndex == 2 && (
            <>
              <StepTitle>음성 녹음을 통해 일정을</StepTitle>
              <div>등록할 수도 있답니다!</div>
              <StepDetail className="T1Txt">
                <p>💡 버튼을 누르고 말해보세요</p>
              </StepDetail>
            </>
          )}
          {tutorialIndex == 3 && (
            <>
              <StepTitle>붙여넣기 버튼을 통해</StepTitle>
              <div>복사한 일정을 간편 입력! 📝</div>
              <StepDetail className="T1Txt">
                <p>💡 스크랩한 일정을 붙여보세요</p>
              </StepDetail>
            </>
          )}
          {tutorialIndex == 4 && (
            <>
              <StepTitle>입력을 완료했다면</StepTitle>
              <div>등록 버튼을 눌러 전송!</div>
              <StepDetail className="T4Error">
                ※ 빈 문자는 입력불가 ※<div></div>
              </StepDetail>
              <StepDetail className="T1Txt">
                알 수 없는 텍스트는 <div></div> 비어있는 일정으로 온답니다!
              </StepDetail>
            </>
          )}
          {tutorialIndex == 5 && (
            <>
              <StepTitle>날짜가 지정되어 있다면</StepTitle>
              <div>"캘린더" 에 입력되고</div>
              <StepDetail className="T1Txt">
                ex. 11월 20일 프로젝트 발표
              </StepDetail>
            </>
          )}
          {tutorialIndex == 6 && (
            <>
              <StepTitle>날짜가 지정되어 있지 않다면</StepTitle>
              <div>"할일 목록"에 등록된답니다.</div>
              <StepDetail className="T1Txt">ex. 프로젝트 발표</StepDetail>
            </>
          )}
          {tutorialIndex == 7 && (
            <>
              <StepDetail>
                <p>구글 로그인을 통해</p>
                <p> P와J 스마트 캘린더를</p>
                <p>마음껏 이용해보세요</p>
              </StepDetail>
              <StepDetail className="T1Txt">
                <div>💸 체험판은 3회 이용 가능</div>
              </StepDetail>
            </>
          )}
        </div>
        <div className="TutorialBtnBox">
          {index > 1 && (
            <button
              onClick={() => {
                dispatch(setBeforeTutorial());
              }}
            >
              ↼
            </button>
          )}
          {index < 7 && (
            <button
              onClick={() => {
                dispatch(setAfterTutorial());
              }}
            >
              ⇀
            </button>
          )}
          <button
            onClick={() => {
              dispatch(setTutorialEnd());
            }}
          >
            {index == 7 ? "Close" : "skip"}
          </button>
        </div>
      </div>
    </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const StepTitle = styled.p`
  margin-top: 10px;
`;

const StepDetail = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
