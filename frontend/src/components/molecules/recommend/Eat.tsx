import { useSelector } from "react-redux";
import {
  EatItemType,
  MusicItemType,
  SportItemType,
  StudyItemType,
  TripItemType,
  selectRecommends,
} from "../../../store/slice/RecommendSlice";
import { useState, useEffect } from "react";

export default function Eat() {
  // 기본 세팅
  const recommends = useSelector(selectRecommends);
  const [items, setItems] = useState<
    | TripItemType[]
    | StudyItemType[]
    | EatItemType[]
    | MusicItemType[]
    | SportItemType[]
    | []
  >([]);

  // 정보 추리기
  useEffect(() => {
    if (recommends) {
      // "category": "공연, 뮤지컬, 콘서트"를 만족하는 아이템 필터링
      const filteredItems = recommends.filter((item) =>
        item.category.includes("맛집")
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
        <div className="RecommendEat">
          <div className="RecommendSubTitle">맛집 어때요?</div>
          <div className="RecommendSlider">
            <h1>Eat</h1>
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
