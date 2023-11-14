import { useSelector } from "react-redux";
import {
  RecommendState,
  selectRecommends,
} from "../../../store/slice/RecommendSlice";
import { useState, useEffect } from "react";

export default function Sports() {
  // 기본 세팅
  const recommends = useSelector(selectRecommends);
  const [items, setItems] = useState<RecommendState[]>([]);

  // 정보 추리기
  useEffect(() => {
    if (recommends) {
      // "category": "공연, 뮤지컬, 콘서트"를 만족하는 아이템 필터링
      const filteredItems = recommends.filter((item) =>
        item.category.includes("스포츠")
      );
      setItems(filteredItems);
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
      <div className="RecommendInner">
        <div className="RecommendSports">
          <div className="RecommendSubTitle">당신이 궁금한 스포츠 일정</div>
          <div className="RecommendSlider">
            <h1>Sports</h1>
            {/* items를 순회하여 각각의 item을 출력 */}
            <div style={{ display: "flex", fontSize: "10px" }}>
              {items.map((item, index) => (
                <div key={index}>
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
        </div>
      </div>
    </>
  );
}
