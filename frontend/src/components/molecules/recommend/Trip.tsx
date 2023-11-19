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
import Recommend from "./Recommend";
import styled from "styled-components";
import subimg from "/image/subimg.svg";
import { useQuery } from "react-query";
import { readTodo } from "../../../api/TodoApi";
import axiosInstance from "../../../functions/AxiosInstance";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";
import { ReqTodoCreate } from "../todo/ApiTodoList";

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
  const [categoryHover, setCategoryHover] = useState({
    boolean: false,
    index: -1,
  });
  const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;
  const { refetch: refetchTodo } = useQuery("todoData", readTodo, {
    enabled: false,
    retry: false,
  }); // todo API

  // 할일목록 추가시
  const handleAddEvent = async (id: number) => {
    await setAuthorizationHeaderInter();
    const reqNewTodo: ReqTodoCreate = {
      summary: items[id].title + " 방문",
    };
    try {
      await axiosInstance.post(`${local_back_url}/api/todo`, reqNewTodo);
      // 투두 다시 불러오기
      console.log("투두 생성 API 요청 완료");
      await refetchTodo();
    } catch (error) {
      console.error("투두 생성 API 에러:", error);
    }
  };

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
      {items.length > 0 && (
        <div className="RecommendInner">
          <div className="RecommendTrip">
            <div className="RecommendSubTitle">힐링 여행 어때요?</div>
            <Recommend>
              {items.map((item, index) => (
                <SliderItem key={index}>
                  <div
                    onMouseEnter={() =>
                      setCategoryHover({
                        boolean: true,
                        index: index,
                      })
                    }
                    onMouseLeave={() =>
                      setCategoryHover({
                        boolean: false,
                        index: -1,
                      })
                    }
                  >
                    <button
                      className={`CategoryAdd ${
                        categoryHover.boolean && categoryHover.index == index
                          ? "CategoryAddActive"
                          : ""
                      }`}
                      onClick={() => {
                        handleAddEvent(index);
                      }}
                    >
                      할일 목록 추가
                    </button>
                    <img
                      src={item.image === "False" ? subimg : item.image}
                      alt={item.image === "False" ? subimg : ""}
                    />
                  </div>
                  <Name>{item.title === "false" ? "" : item.title}</Name>
                  <Place>
                    {item.roadAddress === "false" ? "" : item.roadAddress}
                  </Place>
                  <Info>{item.info === "false" ? "" : item.info}</Info>
                </SliderItem>
              ))}
            </Recommend>
          </div>
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
  width: 85%;
`;
const Place = styled.p`
  font-size: 15px;
  margin-top: 10px;
  width: 85%;
`;
const Info = styled.p`
  font-size: 12px;
  margin-top: 5px;
`;

// const Container = styled.div`
// display: flex;
// flex-direction: column;
// align-items: center;
// justify-content: center;

// `
