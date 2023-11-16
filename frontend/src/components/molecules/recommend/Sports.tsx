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
import SportsRecommend from "./SportsRecommend";
import styled from "styled-components";

export default function Sports() {
  // 기본 세팅
  const recommends = useSelector(selectRecommends);
  const [items, setItems] = useState<
    | TripItemType[]
    | StudyItemType[]
    | EatItemType[]
    | MusicItemType[]
    | SportItemType[]
  >([]);

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
      {items.length > 0 && (
        <div className="RecommendInner">
          <div className="RecommendSports">
            <div className="RecommendSubTitle">당신이 궁금한 스포츠 일정</div>

            <Container>
              <SportsRecommend>
                {items.map((item, index) => (
                  <SliderItem key={index}>
                    <ImageContainer>
                      <Img src={item.awayTeamEmblemUrl} alt={item.category} />
                      <DetailContainer>
                        <Name>{item.league}</Name>
                        <Info>
                          {item.awayTeamName} vs {item.homeTeamName}
                        </Info>
                        <When>{item.gameDate}</When>
                      </DetailContainer>
                      <Img src={item.homeTeamEmblemUrl} alt={item.category} />
                    </ImageContainer>
                  </SliderItem>
                ))}
              </SportsRecommend>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

const SliderItem = styled.div`
  background-color: rgb(243, 250, 255);
  border-radius: 10px;

  img {
    height: 180px;
    object-fit: cover;
    margin-bottom: 10px;
    transition: transform 0.3s ease;
    margin: 10px;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img``;
const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ImageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.p`
  font-size: 18px;
`;

const When = styled.p`
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 20px;
`;
const Info = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;
