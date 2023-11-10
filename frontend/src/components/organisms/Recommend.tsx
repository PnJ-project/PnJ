import "./Recommend.css";

export default function Recommend() {
  return (
    <>
      <div className="RecommendContainer">
        <div className="RecommendTitle">추천페이지</div>
        <div className="RecommendBox">
          <div className="RecommendMuscic"></div>
          <div className="RecommendSports"></div>
          <div className="RecommendStudy"></div>
          <div className="RecommendTrip"></div>
        </div>
      </div>
    </>
  );
}
