// (추천 - 카테고리 - 운동) 슬라이더
import { useMemo } from "react";
import styled from "styled-components";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// 타입
interface sliderProps {
  /** 슬라이더 아이템 요소 */
  children: React.ReactNode;
  /** 커스텀 클래스 */
  className?: string;
  /** 자동재생 (속도 설정시 number 타입으로) */
  autoplay?: boolean | number;
  /** 슬라이더 속도 */
  speed?: number;
  /** 반복 여부 */
  loop?: boolean;
}

function SportRecommend({
  children,
  className,
  autoplay = false,
  speed = 300,
  loop = true,
}: sliderProps) {
  const settings = useMemo<Settings>(
    () => ({
      dots: true,
      infinite: loop,
      speed: speed,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: Boolean(autoplay),
      autoplaySpeed: typeof autoplay === "boolean" ? 3000 : autoplay,
    }),
    [autoplay, loop, speed]
  );
  return (
    <Container>
      <SlideWrapper className={className}>
        <StyledSlider {...settings}>{children}</StyledSlider>
      </SlideWrapper>
    </Container>
  );
}

/** CSS */
const Container = styled.div`
  width: 100%;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
  .click-list {
  }
  .slick-dots {
    bottom: -40px;
  }
  .slick-track {
  }
`;

const SlideWrapper = styled.section`
  position: relative;
`;

export default SportRecommend;
