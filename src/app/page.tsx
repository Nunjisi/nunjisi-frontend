"use client";

import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import ImageDiv from "./components/common/ImageDiv";
import { useRef, useState } from "react";

export default function Home() {
  const [isSwiperEnd, setIsSwiperEnd] = useState(false);
  const [isFadeAnimation, setIsFadeAnimation] = useState(false);
  const [isSlideInAnimation, setIsSlideInAnimation] = useState(false);
  const swiper = useRef<Swiper>(null);
  const router = useRouter();

  const goNewPage = () => {
    router.push("/survey/new");
  };

  const goToLastSlide = () => {
    swiper.current && swiper.current.swiper.slideTo(3);
  };

  return (
    <StLandingPage>
      <StSwiper>
        <Swiper
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={(swiper) => {
            setIsSwiperEnd(swiper.isEnd);
            if (swiper.activeIndex === 1) {
              setIsFadeAnimation(true);
            }
            if (swiper.activeIndex === 3) {
              setIsSlideInAnimation(true);
            }
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          ref={swiper}
        >
          <SwiperSlide>
            <StSlide>
              <StText>
                <p>
                  다가오는 어버이날, <br />
                  어떤 선물을 드려야 할 지 <br />
                  고민이신가요?{" "}
                </p>
              </StText>
            </StSlide>
          </SwiperSlide>
          <SwiperSlide>
            <StSlide>
              <StText>
                <StFadeText1 className={isFadeAnimation ? "fadeAnimation" : ""}>
                  어떤 설문조사에서는, <br />
                  용돈이 1위라는데 <br />
                </StFadeText1>
                <StFadeText2 className={isFadeAnimation ? "fadeAnimation" : ""}>
                  우리 부모님도
                  <br />
                  용돈을 좋아하실까?
                </StFadeText2>
              </StText>
            </StSlide>
          </SwiperSlide>
          <SwiperSlide>
            <StSlide>
              <StText>
                <p>
                  그래서 준비했어요.
                  <br />
                  당신의 고민을 도와줄 <br />
                  <span className="underline">온라인 테스트</span>
                </p>
              </StText>
            </StSlide>
          </SwiperSlide>
          <SwiperSlide>
            <StSlide>
              <StText>
                <p>
                  지금 바로 부모님께
                  <br />
                  <StLogo
                    className={isSlideInAnimation ? "slideInAnimation" : ""}
                    data-text="넌지시 -"
                  >
                    넌지시 -
                  </StLogo>
                  <br />
                  물어보세요.
                </p>
              </StText>
            </StSlide>
          </SwiperSlide>
        </Swiper>
      </StSwiper>
      {isSwiperEnd && (
        <StNextButton onClick={goNewPage}>
          <ImageDiv
            src="/pencil_icon.svg"
            alt="pencil"
            className="pencil_icon"
            width={20}
            height={20}
          />
          <p>30초만에 만들러 가기</p>
        </StNextButton>
      )}
      {!isSwiperEnd && (
        <StSkipButton onClick={goToLastSlide}>건너뛰기</StSkipButton>
      )}
    </StLandingPage>
  );
}

const StLandingPage = styled.main`
  height: 100vh;
`;

const StNextButton = styled.button`
  width: 33rem;
  height: 4.8rem;
  border-radius: 0.8rem;
  font-size: 1.5rem;
  color: white;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 3rem;
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%); /* 좌우 위치 조절 */

  .pencil_icon {
    margin: 0.4rem 0.8rem 0 0;
  }
`;

const StSwiper = styled.div`
  .swiper-slide {
    display: flex;
    justify-content: center;
  }

  .swiper-pagination-bullet {
    background-color: black;
  }
`;

const StSlide = styled.div`
  font-size: 2rem;
  width: 100vw;
  height: 57.4rem; /* 핸드폰에 맞게 임의로 변경 */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const StText = styled.div`
  text-align: center;
  font-size: 3.2rem;
  font-weight: 700;
  line-height: 137%;
  color: #1f6200;

  .underline {
    text-decoration: underline;
    text-underline-offset: 0.5rem; /* 원하는 간격으로 조절 */
  }
`;

const fadeOutAnimation = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.3;
  }
`;

const fadeInAnimation = keyframes`
  from {
    opacity: 0.3;
  }
  to {
    opacity: 1;
  }
`;

const slideInAnimation = keyframes`
    from {
      background-position: -100% 0; /* Start from the right */
    }
    to {
      background-position: -200% 0; /* Slide to the left */
    }
`;

const StFadeText1 = styled.p`
  margin-bottom: 2rem;
  &.fadeAnimation {
    animation: ${fadeOutAnimation} 0.9s forwards;
    animation-delay: 1.4s;
  }
`;

const StFadeText2 = styled.p`
  opacity: 0.3;

  &.fadeAnimation {
    animation: ${fadeInAnimation} 0.9s forwards;
    animation-delay: 1.4s;
  }
`;

const StLogo = styled.span`
  font-family: "Laundry Gothic Bold", sans-serif;

  &.slideInAnimation {
    background: linear-gradient(
      to right,
      rgba(31, 98, 0) 0%,
      rgba(31, 98, 0, 0.1) 50%
    );
    background-size: 200% auto;

    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    animation: ${slideInAnimation} 1s linear forwards;
  }
`;

const StSkipButton = styled.button`
  font-size: 16px;
  width: 8rem;
  height: 2rem;
  text-align: center;
  opacity: 0.6;
  margin: 2.2rem auto 0 auto;
  position: absolute;
  bottom: 3rem;
  left: 50%; /* 가운데 정렬 */
  transform: translateX(-50%); /* 좌우 위치 조절 */
`;
