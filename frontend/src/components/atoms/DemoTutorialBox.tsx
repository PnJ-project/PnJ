import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useDispatch } from "react-redux";
import {
  setBeforeTutorial,
  setAfterTutorial,
  setTutorialEnd,
} from "../../store/slice/Tutorial";
import tutorialLogo from "/image/tutorial1.svg";

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
            <>
              <div>입력창을 통해 </div>
              <div>일정을 등록해보세요</div>
              <div className="T1Txt">
                <p>예시 1{")"} 내일 떡볶이먹기</p>
                <p>예시 2{")"} 16일 ~ 19일에 스키장</p>
                <p>예시 3{")"} 11/30까지 자소서</p>
                <p>예시 4{")"} 나 15일 저녁 약속 있음</p>
              </div>
              <div>*주의*</div>
              <div>여러일정은</div>
              <div> shift + enter로 구분</div>
            </>
          )}
          {tutorialIndex == 2 && (
            <>
              <div>음성 녹음을 통해 일정을</div>
              <div>등록할 수 도 있답니다!</div>
              <div className="T1Txt">
                <p>버튼을 누르고 말해보세요</p>
              </div>
            </>
          )}
          {tutorialIndex == 3 && (
            <>
              <div>붙여넣기를 통해 일정을 </div>
              <div>입력할 수 도 있답니다!!</div>
            </>
          )}
          {tutorialIndex == 4 && (
            <>
              <div>입력을 완료했다면</div>
              <div>등록버튼을 눌러 전송!</div>
            </>
          )}
          {tutorialIndex == 5 && (
            <>
              <div>날짜가 지정되어있다면</div>
              <div>캘린더에 입력되고</div>
            </>
          )}
          {tutorialIndex == 6 && (
            <>
              <div>날짜가 지정되어있지 않다면</div>
              <div>할일 목록에 등록된답니다</div>
            </>
          )}
          {tutorialIndex == 7 && (
            <>
              <div>체험판은 3회밖에 이용할 수 없답니다.</div>
              <div>간편한 구글 로그인을 통해</div>
              <div> PnJ 스마트 캘린더를</div>
              <div>마음껏 이용해보세요!!</div>
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
