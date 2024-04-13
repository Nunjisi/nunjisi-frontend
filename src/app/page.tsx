"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function Home() {
  const router = useRouter();

  const goNewPage = () => {
    router.push("/survey/new");
  };

  return (
    <main>
      <div>
        <StSwiper>
          <Swiper
            spaceBetween={50}
            slidesPerView={1}
            onSlideChange={() => console.log("slide change")}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            onSwiper={(swiper) => console.log(swiper)}
          >
            <SwiperSlide>
              <StSlide>slide1</StSlide>
            </SwiperSlide>
            <SwiperSlide>
              <StSlide>slide2</StSlide>
            </SwiperSlide>
            <SwiperSlide>
              <StSlide>slide3</StSlide>
            </SwiperSlide>
            <SwiperSlide>
              <StSlide>
                slide4{" "}
                <StButton onClick={goNewPage}>30초만에 만들러 가기</StButton>
              </StSlide>
            </SwiperSlide>
          </Swiper>
        </StSwiper>
      </div>
    </main>
  );
}

const StButton = styled.button`
  font-size: 20px;
  color: black;
  background-color: white;
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
  font-size: 20px;
  width: 80vw;
  height: 400px;
  background-color: white;
`;
