import React from "react";
import Recommend from "./Recommend";
import styled from "styled-components";

export default function Sports() {
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
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    {
      league: '프리미어 리그1',
      awayTeamName: '맨체스터 유나이티드',
      homeTeamName: '리버풀 FC',
      gameDate: '2023-12-01 18:30',
      awayTeamEmblemUrl: '맨체스터 유나이티드 로고 URL',
      homeTeamEmblemUrl: '리버풀 FC 로고 URL',
    },
    // ... (다른 더미 데이터 항목들)
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
                      <TeamImage src={item.awayTeamEmblemUrl} alt={item.awayTeamName} />
                      <DetailContainer>
                        <Name>{item.league}</Name>
                        <Info>
                          {item.awayTeamName} vs {item.homeTeamName}
                        </Info>
                        <When>{item.gameDate}</When>
                      </DetailContainer>
                      <TeamImage src={item.homeTeamEmblemUrl} alt={item.homeTeamName} />
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
  background-color: rgb(243, 250, 255);
  border-radius: 10px;
  transition: transform 0.3s ease, filter 0.3s ease;

  img {
    height: 180px;
    object-fit: cover;
    margin-bottom: 10px;
    transition: transform 0.3s ease, filter 0.3s ease;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const TeamImage = styled.img`
  object-fit: cover;
  border-radius: 50%;
  margin: 10px;
`;

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
  margin: 10px;
`;

const Name = styled.p`
  font-size: 18px;
`;

const When = styled.p`
  font-size: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const Info = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;

// 반응형 스타일 추가
const responsiveStyles = {
  [`
    @media only screen and (min-width: 600px) {
      ${SliderItem} {
        img {
          height: 240px;
        }
      }
    }
  `]: true,
  [`
    @media only screen and (min-width: 768px) {
      ${SliderItem} {
        img {
          height: 280px;
        }
      }
    }
  `]: true,
  // 추가적인 반응형 스타일 정의 가능
};

// 반응형 스타일 적용
const StyledSports = styled(Sports)`
  ${Object.keys(responsiveStyles).join(" ")}
`;

export { StyledSports as Sports };
