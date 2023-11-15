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
import TripItem from "../../atoms/recommend/TripItem";
import EatItem from "../../atoms/recommend/EatItem";
import MusicItem from "../../atoms/recommend/MusicItem";
import SportItem from "../../atoms/recommend/SportItem";
import StudyItem from "../../atoms/recommend/StudyItem";

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
      setItems(recommends);
    }
  }, [recommends]);

  // 추천 클릭시
  const handleClickRecommend = () => {};

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
      <div className="RecommendAllOuter">
        <div className="RecommendAllInner">
          {/* items를 순회하여 각각의 item을 출력 */}
          {items.map((item, index) => (
            <>
              {index % 3 === 0 && (
                <div
                  key={index}
                  className="RecommendAllItem"
                  onClick={handleClickRecommend}
                >
                  <>
                    {/* 여행 */}
                    {item.category == "여행" && <TripItem item={item} />}
                    {/* 맛집 */}
                    {item.category == "맛집" && <EatItem item={item} />}
                    {/* 공연 */}
                    {item.category.includes("공연") && (
                      <MusicItem item={item} />
                    )}
                    {/* 공부 */}
                    {item.category == "공부" && <StudyItem item={item} />}
                    {/* 스포츠 */}
                    {item.category == "스포츠" && <SportItem item={item} />}
                  </>
                </div>
              )}
            </>
          ))}
        </div>
        <div className="RecommendAllInner">
          {/* items를 순회하여 각각의 item을 출력 */}
          {items.map((item, index) => (
            <>
              {index % 3 === 1 && (
                <div
                  key={index}
                  className="RecommendAllItem"
                  onClick={handleClickRecommend}
                >
                  <>
                    {/* 여행 */}
                    {item.category == "여행" && <TripItem item={item} />}
                    {/* 맛집 */}
                    {item.category == "맛집" && <EatItem item={item} />}
                    {/* 공연 */}
                    {item.category.includes("공연") && (
                      <MusicItem item={item} />
                    )}
                    {/* 공부 */}
                    {item.category == "공부" && <StudyItem item={item} />}
                    {/* 스포츠 */}
                    {item.category == "스포츠" && <SportItem item={item} />}
                  </>
                </div>
              )}
            </>
          ))}
        </div>
        <div className="RecommendAllInner">
          {/* items를 순회하여 각각의 item을 출력 */}
          {items.map((item, index) => (
            <>
              {index % 3 === 2 && (
                <div
                  key={index}
                  className="RecommendAllItem"
                  onClick={handleClickRecommend}
                >
                  <>
                    {/* 여행 */}
                    {item.category == "여행" && <TripItem item={item} />}
                    {/* 맛집 */}
                    {item.category == "맛집" && <EatItem item={item} />}
                    {/* 공연 */}
                    {item.category.includes("공연") && (
                      <MusicItem item={item} />
                    )}
                    {/* 공부 */}
                    {item.category == "공부" && <StudyItem item={item} />}
                    {/* 스포츠 */}
                    {item.category == "스포츠" && <SportItem item={item} />}
                  </>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </>
  );
}
