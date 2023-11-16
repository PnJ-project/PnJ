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
  const [innerCount, setInnerCount] = useState(3);
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

  // 반응형 설계
  const handleResize = () => {
    // 창의 너비에 따라 innerCount를 동적으로 조정
    if (window.innerWidth < 768) {
      setInnerCount(1);
    } else if (window.innerWidth < 1024) {
      setInnerCount(2);
    } else {
      setInnerCount(3);
    }
  };

  // 리사이즈 이벤트 부여
  useEffect(() => {
    // 초기 로딩 시 한 번 실행
    handleResize();
    // resize 이벤트에 핸들러 등록
    window.addEventListener("resize", handleResize);
    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
        {[...Array(innerCount)].map((_, innerIndex) => (
          <div className="RecommendAllInner" key={innerIndex}>
            {items.map(
              (item, index) =>
                index % innerCount === innerIndex && (
                  <div
                    key={index}
                    className="RecommendAllItem"
                    onClick={handleClickRecommend}
                  >
                    {item.category == "여행" && <TripItem item={item} />}
                    {item.category == "맛집" && <EatItem item={item} />}
                    {item.category.includes("공연") && (
                      <MusicItem item={item} />
                    )}
                    {item.category == "공부" && <StudyItem item={item} />}
                    {item.category == "스포츠" && <SportItem item={item} />}
                  </div>
                )
            )}
          </div>
        ))}
      </div>
    </>
  );
}
