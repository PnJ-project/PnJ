// 맛집 아이템
import { EatItemType } from "../../../store/slice/RecommendSlice";
import { useEffect, useState } from "react";
import { ReqTodoCreate } from "../../molecules/todo/ApiTodoList";
import { useQuery } from "react-query";
import { readTodo } from "../../../api/TodoApi";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";
import axiosInstance from "../../../functions/AxiosInstance";

export default function EatItem({ item }: { item: EatItemType }) {
  // 기본 세팅
  const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;
  const [memberId] = useState(Number(localStorage.getItem("memberId")));
  const [isClick, setIsClick] = useState(false);
  const { refetch: refetchTodo } = useQuery("todoData", readTodo, {
    enabled: false,
    retry: false,
  }); // todo API

  // 할일목록 추가시
  const recommendTodo = async () => {
    await setAuthorizationHeaderInter();
    const reqNewTodo: ReqTodoCreate = {
      memberId: memberId,
      summary: item.title + " 방문",
    };
    try {
      await axiosInstance.post(`${local_back_url}/api/todo`, reqNewTodo);
      // 투두 다시 불러오기
      setIsClick(true);
      console.log("투두 생성 API 요청 완료");
      await refetchTodo();
    } catch (error) {
      console.error("투두 생성 API 에러:", error);
    }
  };

  // 재렌더링시 선택여부 초기화
  useEffect(() => {
    setIsClick(false);
  }, [item]);

  return (
    <>
      <img src={item.image}></img>
      {/* 내용물 */}
      <div className="RecommendItemShow">
        <div className="EatTitle">{item.title}</div>
        {item.info != "false" && item.info && (
          <div className="EatInfo">{item.info}</div>
        )}
        {item.roadAddress != "false" && item.roadAddress && (
          <div className="EatAddress">{item.roadAddress}</div>
        )}
        {/* 버튼 */}
        <div className="RecommendBtnBox">
          {item.homepage != "false" && item.homepage && (
            <button
              onClick={() => {
                window.location.href = item.homepage;
              }}
            >
              링크 이동
            </button>
          )}
          <button className="RecommendAddBtn" onClick={recommendTodo}>
            {!isClick ? "할일 목록 추가" : "✔"}
          </button>
        </div>
      </div>
    </>
  );
}
