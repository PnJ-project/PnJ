import { useEffect, useState } from "react";
import Styles from "./UpBtn.module.css";

interface TextBtnProps {
  howscroll: number;
}
const UpBtn: React.FC<TextBtnProps> = ({ howscroll }) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  useEffect(() => {
    // Function to handle scrolling and show/hide the button
    const handleScroll = () => {
      if (window.scrollY > howscroll) {
        setIsButtonVisible(true);
      } else {
        setIsButtonVisible(false);
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Function to handle button click
  const handleButtonClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isButtonVisible && (
        <button className={Styles.UpBtn} onClick={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="2em"
            viewBox="0 0 512 512"
            fill="#747474"
          >
            <path d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" />
          </svg>
        </button>
      )}
    </>
  );
};

export default UpBtn;
