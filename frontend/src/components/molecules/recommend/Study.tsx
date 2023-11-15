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
import Recommend from './Recommend';
import styled from "styled-components";
import recommendP from '/image/recommendP.svg';

export default function Study() {
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
        item.category.includes("공부")
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

  // 이름 데이터가 있는지 확인하고 첫 번째 명언만 추출
  const nameToDisplay = items.length > 0 ? items[0].maxim : '';

  return (
    <>
      <div className="RecommendInner">
        <div className="RecommendStudy">
          <div className="RecommendSubTitle">당신을 위한 명언</div>
          <FlexContainer>
            <Img src={recommendP} />
                <Name>{nameToDisplay}</Name>
          </FlexContainer>
        </div>
      </div>
    </>
  );
}

const FlexContainer = styled.div`
  display: flex;
  align-items: center; 
  justify-content: center;
`;



const Img = styled.img`
  width: 130px;
  height: 130px;
  margin-right: 30px;
`;

const Name = styled.p`
  font-size: 18px;
  width: 500px;
`;
