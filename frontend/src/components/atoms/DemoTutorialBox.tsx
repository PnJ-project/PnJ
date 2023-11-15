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
        } ${tutorialIndex == 6 && "TutorialInfo6"}`}
      >
        <div className="TutorialDetail">
          <img
            src={tutorialLogo}
            alt=""
            style={{ width: "100px", cursor: "pointer" }}
          />
          {tutorialIndex == 1 && (
            <Container>
              <StepTitle>입력창을 통해</StepTitle>
              <div>일정을 등록해보세요</div>
              <StepDetail className="T1Txt">
                <p>예시 1{")"} 내일 떡볶이먹기</p>
                <p>예시 2{")"} 16일 ~ 19일에 스키장</p>
                <p>예시 3{")"} 11/30까지 자소서</p>
                <p>예시 4{")"} 나 15일 저녁 약속 있음</p>
              </StepDetail>
              <StepDetail>
              <div>주의✅</div>
              <div>여러 일정은</div>
              <div>shift + enter로 구분</div>   
              </StepDetail>

            </Container>
          )}
          {tutorialIndex == 2 && (
            <>
              <StepTitle>음성 녹음을 통해 일정을</StepTitle>
              <div>등록할 수도 있답니다!</div>
              <StepDetail className="T1Txt">
                <p>버튼을 누르고 일정을 말해보세요</p>
              </StepDetail>
            </>
          )}
          {tutorialIndex == 3 && (
            <>
              <StepTitle>붙여넣기를 통해 일정을</StepTitle>
              <div>입력할 수도 있어요📝</div>
            </>
          )}
          {tutorialIndex == 4 && (
            <>
              <StepTitle>입력을 완료했다면</StepTitle>
              <div>등록버튼을 눌러 전송!</div>
            </>
          )}
          {tutorialIndex == 5 && (
            <>
              <StepTitle>날짜가 지정되어있다면</StepTitle>
              <div>캘린더에 입력되고</div>
            </>
          )}
          {tutorialIndex == 6 && (
            <>
              <StepTitle>날짜가 지정되어있지 않다면</StepTitle>
              <div>할일 목록에 등록된답니다.</div>
            </>
          )}
          {tutorialIndex == 7 && (
            <>
              <StepTitle>체험판은 단 3회만</StepTitle> 
              <div>이용가능해요!</div>
              <StepDetail>
              <p>간편한 구글 로그인을 통해</p>
              <p> P와J 스마트 캘린더를</p>
              <p>마음껏 이용해보세요!!</p>
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

          <button
            onClick={() => {
              dispatch(setAfterTutorial());
            }}
          >
            ⇀
          </button>
          <button
            onClick={() => {
              dispatch(setTutorialEnd());
            }}
          >
            skip
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


`
const StepTitle = styled.p`
margin-top: 10px;
`

const StepDetail = styled.div`
margin-top: 10px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;

`