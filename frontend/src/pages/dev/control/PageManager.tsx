// import React from "react";
import { Link } from "react-router-dom";
import "./PageManager.css";
// import BackBtn from "../commponents/Base/BackBtn";

function PageManager() {
  const PM: Record<string, string> = {
    // Add more components and their URLs as needed...
    Demo: "/demo",
    // 메인서비스
    Calendar: "/",
    Community: "/community",
    Solution: "/solution",
    SolutionList: "/solutionlist",
    // 회원관리
    SignUp: "/signup",
    Login: "/login",
    MyPage: "/mypage",
    // 기타
    Notfound: "/notexisturl",
    About: "/about",
    Contact: "/contact",
    Team: "/team",
    // 개발자용
    PageManager: "/PM",
    TestManager: "/TM",
  };

  const sections = {
    Entrance: ["Demo"],
    Auth: ["SignUp", "Login", "MyPage"],
    Calendar: ["Calendar", "Community"],
    Solution: ["Solution", "SolutionList"],
    Other: ["Contact", "About", "Team", "Notfound"],
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
