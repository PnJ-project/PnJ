// 명언 아이템
import { useState } from "react";
import { TripItemType } from "../../../store/slice/RecommendSlice";
import recommendNotFound from "/image/recommendNotFound.svg";

export default function StudyItem({ item }: { item: TripItemType }) {
  // 기본 세팅
  const [loading, setLoading] = useState(true);

  // 이미지 로딩중일대
  const handleImageLoad = () => {
    setLoading(false);
  };
  return (
    <>
      {loading && (
        <img
          onLoad={handleImageLoad}
          src={"https://source.unsplash.com/random/3×5"}
          style={{ display: "none" }}
        />
      )}
      {loading ? (
        <img src={recommendNotFound} />
      ) : (
        <img src={"https://source.unsplash.com/random/3×5"} />
      )}
      {/* 내용물 */}
      <div className="RecommendItemShowStudy">
        <div className="StudyTxt">{item.maxim}</div>
        <div className="StudyAutor">-{item.author}-</div>
      </div>
    </>
  );
}
