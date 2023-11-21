// 개발자용 페이지 매니저입니다
import { Link } from "react-router-dom";
import "./PageManager.css";

export default function PageManager() {
  // 페이지 정보
  const PM: Record<string, string> = {
    // 메인 서비스
    Demo: "/demo",
    Calendar: "/",
    // 기타
    Notfound: "/notexisturl",
    About: "/about",
    Team: "/team",
    // 개발자용
    PageManager: "/PM",
    TestManager: "/TM",
  };

  // 페이지 구분
  const sections = {
    Entrance: ["Demo"],
    Calendar: ["Calendar"],
    Other: ["About", "Team", "Notfound"],
    Develop: ["PageManager", "TestManager"],
  };
  return (
    <>
      <div className="worksBackBtn">
        <div className="workTitle">{"PageManager"}</div>
      </div>
      {/* 각 기능 접근 */}
      <div className="PMContainer">
        {Object.entries(sections).map(([sectionName, componentList]) => (
          <div key={sectionName} className="PMSection">
            <h3>{sectionName}</h3>
            {componentList.map((componentName) => (
              <Link key={componentName} to={PM[componentName]}>
                <button className="PMBtn">{componentName}</button>
              </Link>
            ))}
          </div>
        ))}
      </div>
      <hr />
      {/* 작업 목록 노트 */}
      <div className="workContainer"></div>
    </>
  );
}
