// 명언 아이템
import { TripItemType } from "../../../store/slice/RecommendSlice";

export default function StudyItem({ item }: { item: TripItemType }) {
  return (
    <>
      <img src={"https://picsum.photos/1000/1500"}></img>
      {/* 내용물 */}
      <div className="RecommendItemShowStudy">
        <div style={{ marginBottom: "5px" }}>{item.maxim}</div>
        <div>-{item.author}-</div>
      </div>
    </>
  );
}
