import { useSelector } from "react-redux";
import {
  EatItemType,
  MusicItemType,
  SportItemType,
  StudyItemType,
  TripItemType,
  selectRecommends,
} from "../../../store/slice/RecommendSlice";
import { useEffect, useState } from "react";
import Recommend from './Recommend';
import styled from "styled-components";
import subimg from '/image/subimg.svg'

export default function Trip() {
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
      // "category": "여행"를 만족하는 아이템 필터링
      const filteredItems = recommends.filter((item) =>
        item.category.includes("여행")
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
        <div className="RecommendTrip">
          <div className="RecommendSubTitle">여행 어때요?</div>

            <Recommend>
              {items.map((item, index) => (
                <SliderItem key={index}>
                  <img 
                    src={item.image === "false" ? subimg : item.image} 
                    alt={item.image === "false" ? subimg : ''} 
                  />
                  <Name>{item.title === "false" ? '' : item.title}</Name>
                  <Place>{item.roadAddress === "false" ? '' : item.roadAddress}</Place>
                  <Info>{item.info === "false" ? '' : item.info}</Info>

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
width: 85%;
`
const Place = styled.p`
font-size: 15px;
margin-top: 10px;
width: 85%;
`
const Info = styled.p`
font-size: 12px;
margin-top: 5px;
`

