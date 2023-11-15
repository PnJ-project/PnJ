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
import Eatimg from '/image/Eatimg.svg'

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

          <Recommend>
              {items.map((item, index) => (
                <SliderItem key={index}>
                  <img 
                    src={item.image === "False" ? Eatimg : item.image} 
                    alt={item.image === "False" ? Eatimg : ''} 
                  />
                  <Name>{item.title}</Name>
                  <Place>{item.roadAddress}</Place>
                  <Info>{item.info}</Info>

                </SliderItem>
              ))}
            </Recommend>

        </div>
      </div>
    </>
  );
}

const SliderItem = styled.div`

  img{
    width: 94%;
    height: 240px;
    object-fit: cover; 
    margin-bottom: 20px;
    transition: transform 0.3s ease; 
    border: none;
    box-shadow: none;

    &:hover {
      transform: scale(1.1); 
    }
  }
`;


const Name = styled.p`
font-size: 18px;
width: 80%;
`
const Place = styled.p`
font-size: 15px;
margin-top: 10px;
width: 85%;

`
const Info = styled.p`
font-size: 12px;
margin-top: 5px;
width: 85%;
`

