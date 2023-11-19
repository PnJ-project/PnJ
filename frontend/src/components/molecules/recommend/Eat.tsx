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
import EatRecommend from "./EatRecommend";
import styled from "styled-components";
import Eatimg from "/image/Eatimg.svg";
import { useQuery } from "react-query";
import { readTodo } from "../../../api/TodoApi";
import axiosInstance from "../../../functions/AxiosInstance";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";
import { ReqTodoCreate } from "../todo/ApiTodoList";

export default function Eat() {
  // 기본 세팅
  const recommends = useSelector(selectRecommends);
  const [categoryHover, setCategoryHover] = useState({
    boolean: false,
    index: -1,
  });
  const [items, setItems] = useState<
    | TripItemType[]
    | StudyItemType[]
    | EatItemType[]
    | MusicItemType[]
    | SportItemType[]
    | []
  >([]);
  const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;
  const [memberId] = useState(Number(localStorage.getItem("memberId")));
  const { refetch: refetchTodo } = useQuery("todoData", readTodo, {
    enabled: false,
    retry: false,
  }); // todo API

  // 할일목록 추가시
  const handleAddEvent = async (id: number) => {
    await setAuthorizationHeaderInter();
    const reqNewTodo: ReqTodoCreate = {
      memberId: memberId,
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
      {items.length > 0 && (
        <div className="RecommendInner">
          <div className="RecommendEat">
            <div className="RecommendSubTitle">당신이 관심 있는 맛집</div>
            <EatRecommend>
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
                      src={item.image === "False" ? Eatimg : item.image}
                      alt={item.image === "False" ? Eatimg : ""}
                    />
                  </div>
                  <Name>{item.title}</Name>
                  <Place>{item.roadAddress}</Place>
                  <Info>{item.info}</Info>
                </SliderItem>
              ))}
            </EatRecommend>
          </div>
        </div>
      )}
    </>
  );
}

const SliderItem = styled.div`
  img {
    width: 94%;
    height: 150px;
    object-fit: cover;
    margin-bottom: 20px;
    transition: transform 0.3s ease, filter 0.3s ease;
    border: none;
    box-shadow: none;

    &:hover {
      transform: scale(1.1);
      filter: brightness(20%); /* 이미지를 조금 어둡게 만듭니다. */
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
