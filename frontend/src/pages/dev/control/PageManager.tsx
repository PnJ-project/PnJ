import { Link } from "react-router-dom";
import "./PageManager.css";

function PageManager() {
  const PM: Record<string, string> = {
    Demo: "/demo",
    // 메인서비스
    Calendar: "/",
    // 기타
    Notfound: "/notexisturl",
    About: "/about",
    Team: "/team",
    // 개발자용
    PageManager: "/PM",
    TestManager: "/TM",
  };

  const sections = {
    Entrance: ["Demo"],
    Calendar: ["Calendar"],
    Other: ["About", "Team", "Notfound"],
    Develop: ["PageManager", "TestManager"],
  };
  return (
    <>
      <div className="worksBackBtn">
        {/* <BackBtn /> */}
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

export default PageManager;
