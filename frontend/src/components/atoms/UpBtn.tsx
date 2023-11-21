// 최상단 이동 버튼
import { useEffect, useState } from "react";
import Styles from "./UpBtn.module.css";

// 타입
interface TextBtnProps {
  howscroll: number;
}

const UpBtn: React.FC<TextBtnProps> = ({ howscroll }) => {
  // 기본 세팅
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  // 최초 스크롤 이벤트 세팅
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > howscroll) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 버튼 눌렀을시 이벤트
  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isButtonVisible && (
        <div className={Styles.UpBtn} onClick={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 512 512"
            fill="#38643c"
          >
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
          </svg>
        </div>
      )}
    </>
  );
};

export default UpBtn;
