import React from "react";
import Recommend from "./Recommend";
import styled from "styled-components";



export default function Music() {
  const items = [
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그2',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그3',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그4',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그5',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그6',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그7',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그8',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그9',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그10',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그11',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그12',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그13',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    // 추가적인 더미 데이터 항목들...
  ];


  return (
    <>
      {items.length > 0 && (
        <div className="RecommendInner">
          <div className="RecommendSports">
            <div className="RecommendSubTitle">당신이 궁금한 스포츠 일정</div>
            <Container>
              <Recommend>
                {items.map((item, index) => (
                  <SliderItem key={index}>
                    <ImageContainer>
                      <img src={item.awayTeamEmblemUrl} alt={item.league} />
                      <DetailContainer>
                        <Name>{item.league}</Name>
                        <Info>
                          {item.awayTeamName} vs {item.homeTeamName}
                        </Info>
                        <When>{item.gameDate}</When>
                      </DetailContainer>
                      <img src={item.homeTeamEmblemUrl} alt={item.league} />
                    </ImageContainer>
                  </SliderItem>
                ))}
              </Recommend>
            </Container>
          </div>
        </div>
      )}
    </>
  );
}

const SliderItem = styled.div`
  width: 100%;
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 240px;
    object-fit: cover;
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
`;

const Info = styled.p`
  font-size: 12px;
  margin-top: 5px;
  width: 85%;
`;

const When = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;

const DetailContainer = styled.div`
  text-align: center;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Container = styled.div`
  margin-top: -30px;
`;
