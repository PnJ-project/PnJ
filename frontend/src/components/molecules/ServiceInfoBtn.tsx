import { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import About from "../../pages/service/About";

// 서비스 소개 버튼
export default function ServiceInfoBtn() {
  // 기본세팅
  const [showServiceIntro, setShowServiceIntro] = useState(false); // 서비스 소개

  // 마우스 올릴시
  const handleMouseEnter = () => {
    setShowServiceIntro(true);
  };
  // 마우스 나갈시
  const handleMouseLeave = () => {
    setShowServiceIntro(false);
  };

  return (
    <>
      <div
        className="ServiceIntro"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ verticalAlign: "middle", fontSize: "30px" }}
      >
        <AiFillQuestionCircle />
        {showServiceIntro && (
          <div className="ServiceIntroTooltip">
            <div className="ServiceIntroContent">
              <About />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
