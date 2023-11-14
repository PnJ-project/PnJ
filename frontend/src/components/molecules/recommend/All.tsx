import { useSelector } from "react-redux";
import {
  RecommendState,
  selectRecommends,
} from "../../../store/slice/RecommendSlice";
import { useState, useEffect } from "react";

export default function Eat() {
  // 기본 세팅
  const recommends = useSelector(selectRecommends);
  const [items, setItems] = useState<RecommendState[]>([]);

  // 정보 추리기
  useEffect(() => {
    if (recommends) {
      setItems(recommends);
    }
  }, [recommends]);

  // 정보없을시
  if (!recommends) {
    return (
      <>
        <div>로딩중입니다.</div>
      </>
    );
  }
  return (
    <>
      {/* <div className="RecommendSubTitle">전체보기</div> */}
      <div className="RecommendAllOuter">
        <div className="RecommendAllInner">
          {/* items를 순회하여 각각의 item을 출력 */}
          {items.map((item, index) => (
            <div key={index} className="RecommendAllItem">
              {/* item 내부의 키와 값을 출력 */}
              {Object.entries(item).map(([key, value]) => (
                <p key={key}>
                  {key}: {value}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
