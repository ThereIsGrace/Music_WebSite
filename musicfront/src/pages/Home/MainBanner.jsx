import React from "react";
import styled from "styled-components";
import {Image} from "@/components";
import BannerImg from "@/assets/Home/mainBanner1.png";
import MusicCat from "@/assets/Home/music-cat.png"
import BannerImg2 from "@/assets/Home/mainBanner2.png";
import BannerImg3 from "@/assets/Home/mainBanner3.png";
import BannerImg4 from "@/assets/Home/mainBanner4.png";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import "swiper/css";
import {useNavigate} from "react-router-dom";

export function MainBanner() {
  const navigate = useNavigate();

  const popularBtn = (e) => {
    e.preventDefault();
    navigate("/popular");
  };

  return (
    <StyledBanner>
      <Swiper modules={[Autoplay]} autoplay={({speed: 500}, {disableOnInteraction: false})} loop={true}>
        <SwiperSlide>
          <a href="/#" onClick={popularBtn}>
            <div className="container">
              <div className="text-container">
                <h1>aaa</h1>
                <p>aaa</p>
              </div>
              <Image src={MusicCat} alt="" style={{width: '300px'}}/>
            </div>
            
          </a>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={BannerImg2} alt="" />
          <div className="text-container">
                <h4>aaa</h4>
                <p>aaa</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={BannerImg3} alt="" />
          <div className="text-container">
            <h1>aaa</h1>
            <p>aaa</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={BannerImg4} alt="" />
        </SwiperSlide>
      </Swiper>
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  background: linear-gradient(#4997dc, #4261c0);
  /* width: clamp(1040px, 100%, 1920px); */
  margin: auto;

  
  display: block;

  & .swiper {
    width: 100%;
    height: 100%;
  }

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & img {
    margin-top: 30px;
    display: block;
    width: 100%;
    height: 100%;
    max-width: 500px;
    object-fit: cover;
  }
`;
