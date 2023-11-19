import React from "react";
import { useMemo } from "react";
import styled from "styled-components";
import Slider, { Settings } from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SlideWrapper = styled.section`
  position: relative;
`;

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

function Recommend({
  children,
  className,
  autoplay = false,
  speed = 300,
  loop = true,
}: sliderProps) {


  const settings = useMemo<Settings>(
    () => {
      const totalSlides = React.Children.count(children);
      const visibleSlides = Math.min(totalSlides, 6); // 최대 6개까지 보여주도록
      const slidesToScroll = Math.min(visibleSlides, 6); // 스크롤할 때 몇 개씩 넘길지

      return {
        dots: true,
        infinite: loop,
        speed: speed,
        slidesToShow: visibleSlides,
        slidesToScroll: slidesToScroll,
        autoplay: Boolean(autoplay),
        autoplaySpeed: typeof autoplay === 'boolean' ? 3000 : autoplay,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: Math.min(visibleSlides, 4),
              slidesToScroll: Math.min(visibleSlides, 4),
            },  
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: Math.min(visibleSlides, 1),
            slidesToScroll: Math.min(visibleSlides, 1),
            },
          },
        
      ],
    };
  }, [autoplay, loop, speed, children]);

  return (
    <SlideWrapper className={className}>
      <StyledSlider {...settings}>{children}</StyledSlider>
    </SlideWrapper>
  );
}

const StyledSlider = styled(Slider)`
  .slick-prev {
    left: -30px;
  }

  .slick-next {
    right: -30px;
  }

  .slick-prev:hover,
  .slick-next:hover {
    opacity: 1;
  }

  .slick-dots {
    bottom: -40px;
    /* margin-bottom: 20px; */
  }
`;

export default Recommend;
