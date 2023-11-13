import { motion, AnimatePresence, useMotionValue } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import PnjLogo from "../../components/atoms/PnjLogoTeam";
import daeyoung from "../../../public/image/daeyoung.svg";
import haejin from "../../../public/image/haejin.svg";
import jaew from "../../../public/image/jaew.svg";
import junha from "../../../public/image/junha.svg";
import shee from "../../../public/image/shee.svg";
import sw from "../../../public/image/sw.svg";
import styled from "styled-components";
import "./Team.css";

export default function Team() {
  const [visibleIndex, setVisibleIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const boxRef = useRef<HTMLDivElement>(null);
  const [xValue, setXValue] = useState(0);
  const x = useMotionValue(xValue);

  const slides = [
    {
      id: 0,
      content: <img src={haejin} alt="haejin" />,
      background: "#dfe285",
      name: "김혜진",
      position: "BE",
    },
    {
      id: 1,
      content: <img src={jaew} alt="jaew" />,
      background: "#d3a9a9",
      name: "조재웅",
      position: "BE",
    },
    {
      id: 2,
      content: <img src={daeyoung} alt="daeyoung" />,
      background: "#9bc1bc",
      name: "임대영",
      position: "BE",
    },
    {
      id: 3,
      content: <img src={junha} alt="junha" />,
      background: "#a9d0a9",
      name: "조준하",
      position: "FE",
    },
    {
      id: 4,
      content: <img src={shee} alt="shee" />,
      background: "#c39abb",
      name: "박승희",
      position: "FE",
    },
    {
      id: 5,
      content: <img src={sw} alt="sw" />,
      background: "#95a3b6",
      name: "이성원",
      position: "FE",
    },
  ];
  const showNextSlide = () => {
    setDirection("next");
    setVisibleIndex((prev) =>
      prev === slides.length - 1 ? slides.length - 1 : prev + 1
    );
  };
  const showPrevSlide = () => {
    setDirection("prev");
    setVisibleIndex((prev) => (prev === 0 ? 0 : prev - 1));
  };
  const slideVariants = {
    hidden: (direction: "next" | "prev") => ({
      x: direction === "next" ? 500 : -500,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    }),
    visible: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.3 },
    },
    exit: (direction: "next" | "prev") => ({
      x: direction === "next" ? -500 : 500,
      opacity: 0,
      scale: 0.9,
      transition: { duration: 0.3 },
    }),
  };
  const background = slides[visibleIndex].background;

  useEffect(() => {
    x.onChange(() => {
      console.log(x.get());
    });
  }, [x]);

  return (
    <>
      <PnjLogo />
      <div className="app" ref={boxRef}>
        <motion.div
          className="slider"
          animate={{ background, transition: { duration: 0.3 } }}
        >
          <AnimatePresence custom={direction}>
            {slides.map((slide, i) =>
              i === visibleIndex ? (
                <motion.div
                  className="slide"
                  key={slide.id}
                  variants={slideVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  custom={direction}
                  drag="x"
                  dragSnapToOrigin
                  dragTransition={{ bounceStiffness: 300, bounceDamping: 50 }}
                  whileTap={{ scale: 0.9 }}
                  dragConstraints={{
                    left: -window.innerWidth,
                    right: window.innerWidth,
                  }}
                  dragElastic={false}
                  onDrag={(_, info) => {
                    setXValue(info.point.x);
                    x.set(info.offset.x);
                  }}
                  onDragEnd={(_, info) => {
                    if ("offset" in info) {
                      if (
                        info.offset.x < 0 &&
                        Math.abs(info.offset.x) >= window.innerWidth / 4
                      ) {
                        showNextSlide();
                      } else if (
                        info.offset.x > 0 &&
                        info.offset.x >= window.innerWidth / 4
                      ) {
                        showPrevSlide();
                      }
                      setXValue(info.offset.x);
                      x.set(info.offset.x);
                    }
                  }}
                >
                  <div>
                    <span>{slide.content}</span>
                    <Name>{slide.name}</Name>
                    <Position>{slide.position}</Position>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </motion.div>
        <div className="buttons">
          <PrevButton
            type="button"
            className="prev"
            onClick={showPrevSlide}
            disabled={visibleIndex === 0}
          >
            {" "}
            ↼
          </PrevButton>
          <NextButton
            type="button"
            className="next"
            onClick={showNextSlide}
            disabled={visibleIndex === slides.length - 1}
          >
            ⇀
          </NextButton>
        </div>
      </div>
    </>
  );
}

const Name = styled.p`
  font-size: 25px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
`;
const Position = styled.p`
  font-size: 15px;
  margin-top: 5px;
  display: flex;
  justify-content: center;
`;

const PrevButton = styled.button`
  opacity: 0.8;
  border-radius: 1vmin;
  border: 0;
  background-color: #fff;
  font-size: 3vmin;
  cursor: pointer;
  color: #1a1a1a;
`;

const NextButton = styled.button`
  opacity: 0.8;
  border-radius: 1vmin;
  border: 0;
  font-size: 3vmin;
  cursor: pointer;
  color: #1a1a1a;
`;
