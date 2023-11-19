// 여행 아이템
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { readTodo } from "../../../api/TodoApi";
import { TripItemType } from "../../../store/slice/RecommendSlice";
import { ReqTodoCreate } from "../../molecules/todo/ApiTodoList";
import { setAuthorizationHeaderInter } from "../../../functions/BaseFunc";
import axiosInstance from "../../../functions/AxiosInstance";
import recommendNotFound from "/image/recommendNotFound.svg";

export default function TripItem({ item }: { item: TripItemType }) {
  // 기본 세팅
  const local_back_url = import.meta.env.VITE_APP_BACKEND_SERVER_LIVE;
  const [isClick, setIsClick] = useState(false);
  const [memberId] = useState(Number(localStorage.getItem("memberId")));
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
      <>
        {item.image != "false" && item.image ? (
          <img src={item.image}></img>
        ) : (
          <img
            src={recommendNotFound}
            className="RecommendNotImg"
            style={{ width: "50px" }}
          ></img>
        )}
        {/* 내용물 */}
        <div className="RecommendItemShow">
          <div className="TripTitle">{item.title}</div>
          {item.roadAddress != "false" && item.roadAddress && (
            <div className="TripSub">{item.roadAddress}</div>
          )}
          {item.info != "false" && item.info && (
            <div className="TripSub">{item.info}</div>
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
    </>
  );
}
