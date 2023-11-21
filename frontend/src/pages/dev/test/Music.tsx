import Recommend from "./Recommend";
import styled from "styled-components";

const dummyData = [
  {
    title: "더미 콘서트 1",
    image: "path/to/dummy-image-1.jpg",
    info: "더미 콘서트 정보 1",
    openDate: "2023-01-01",
    finalDate: "2023-01-10",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 2",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 3",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 4",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 5",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 6",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 7",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 8",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 9",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 10",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 11",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 12",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
  {
    title: "더미 콘서트 13",
    image: "path/to/dummy-image-2.jpg",
    info: "더미 콘서트 정보 2",
    openDate: "2023-02-01",
    finalDate: "2023-02-15",
    category: ["공연", "뮤지컬", "콘서트"],
  },
];

export default function Music() {
  return (
    <>
      {dummyData.length > 0 && (
        <div className="RecommendInner">
          <Container className="RecommendMuscic">
            <div className="RecommendSubTitle">이런 공연/전시 어때요?</div>
            <Recommend>
              {dummyData.map((item, index) => (
                <SliderItem key={index}>
                  <img src={item.image} alt={item.title} />
                  <Name>{item.title}</Name>
                  <Place>{item.info}</Place>
                  <Info>
                    {item.openDate}-{item.finalDate}
                  </Info>
                </SliderItem>
              ))}
            </Recommend>
          </Container>
        </div>
      )}
    </>
  );
}

const SliderItem = styled.div`
  img {
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
`;
const Place = styled.p`
  font-size: 15px;
  margin-top: 10px;
  width: 85%;
`;
const Info = styled.p`
  font-size: 12px;
  margin-top: 5px;
  width: 85%;
`;

const Container = styled.div`
  margin-top: -30px;
`;
