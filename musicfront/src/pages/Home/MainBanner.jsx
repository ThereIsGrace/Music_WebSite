import React from "react";
import styled from "styled-components";
import {Image} from "@/components";
import BannerImg from "@/assets/Home/mainBanner1.png";
import MusicCat from "@/assets/Home/music-cat.png"
import SleepingMusic from "@/assets/Home/sleeping-music.jpg"
import NewPants from "@/assets/Home/aa.jpeg"
import BannerImg2 from "@/assets/Home/mainBanner2.png";
import BannerImg3 from "@/assets/Home/mainBanner3.png";
import BannerImg4 from "@/assets/Home/mainBanner4.png";
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay} from "swiper";
import "swiper/css";
import { Button, Container } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export function MainBanner() {
  const navigate = useNavigate();

  const popularBtn = (e) => {
    e.preventDefault();
    navigate("/popular");
  };

  return (
    <StyledBanner>
      <Swiper modules={[Autoplay]} autoplay={({speed: 1000}, {disableOnInteraction: false})} loop={true}>
        <SwiperSlide>
          <Container className="main-container">
            <div className="text-container">
              <h1 style={{margin: '100px'}}>The Best Music Website!!</h1>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ut sagittis nisl, 
                eu elementum quam. Proin molestie justo a arcu sollicitudin, a aliquam nisi dictum. Integer sit amet pellentesque turpis. Nullam iaculis egestas viverra. Vivamus sagittis sapien blandit mi suscipit, 
                eget varius nibh finibus. Sed elementum euismod ex. In et arcu tincidunt, cursus est et, rhoncus leo.</p>
                <Button variant="light">Light</Button>{' '}
            </div>
            <div className="logo-image">
              <a href="/#" onClick={popularBtn}>
                <Image src={MusicCat} alt="" style={{width: '300px'}}/>
              </a>
            </div>
          </Container>
        </SwiperSlide>
        <SwiperSlide>
            <Image src={NewPants} alt=""/>
        </SwiperSlide>
        <SwiperSlide>
          <Image src={SleepingMusic} alt="" />
        </SwiperSlide>
      </Swiper>
    </StyledBanner>
  );
}

const StyledBanner = styled.div`
  background: linear-gradient(#4997dc, #4261c0);
  /* width: clamp(1040px, 100%, 1920px); */
  margin-top: 50px;
  

  & .main-container {
    max-width: 1000px;
    display: flex;
    height: 450px;
  }

  & .text-container {
    color: white;
    font-size: 20px;
  }

  & .swiper {
    width: 100%;
    height: 100%;
  }

  & .text-container {
    float: left;
    align-items: middle;
    text-align: center;
  }

  & .swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  & img {
    display: block;
    width: 100%;
    height: 100%;
    max-height: 450px;
    object-fit: cover;
    object-position: center;
  }
`;
