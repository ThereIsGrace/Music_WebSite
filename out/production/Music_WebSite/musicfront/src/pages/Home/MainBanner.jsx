import React, { useRef } from "react";
import styled from "styled-components";
import {Image} from "@/components";
import BannerImg from "@/assets/Home/mainBanner1.png";
import MusicCat from "@/assets/Home/music-cat.png"
import SleepingMusic from "@/assets/Home/sleeping-music.jpg"
import NewPants from "@/assets/Home/aa.jpeg"
import BannerImg2 from "@/assets/Home/mainBanner2.png";
import BannerImg3 from "@/assets/Home/mainBanner3.png";
import BannerImg4 from "@/assets/Home/mainBanner4.png";
import MusicMovie from "@/assets/video/musicmovie.mp4";
import { Button, Container } from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export function MainBanner() {
  const navigate = useNavigate();
  const videoRef = useRef();
  const setPlayBackRate = () => {
    videoRef.current.playBackRate = 0.5;
  }

  const popularBtn = (e) => {
    e.preventDefault();
    navigate("/popular");
  };

  return (
    <StyledBanner>
      <div className="banner-box">
        <div className="banner-video">
          <video
            muted
            autoPlay
            loop
            ref={videoRef}
            onCanPlay={() => setPlayBackRate()}
          >
          <source src={MusicMovie} type="video/mp4">
          </source>
          </video> 
        </div>
        <div className="banner-text">
          <h1 className="text-center color-white font-big">music makes people one</h1>        
          <h2 className="text-center color-white font-semibold">The best music website MusicCat</h2>
        </div>
      </div>



      

    </StyledBanner>
  );
}



const StyledBanner = styled.div`
  // 웹페이지에 여백 없이 만들기
  padding: 0px; 
  margin: 0px;
  background-color: black;
  
  & .banner-box{
    width: 100%;
    height: 550px;
    overflow: hidden;
    margin: 0px auto;
    position: relative;
  }
  
  & video {
    width: 100%;
    object-fit: cover;
    object-position: center;
    animation: animate 13s infinite;
  }

  & .banner-text {
    position: absolute;
    top: 40%;
    width: 100%;
    left: auto;
  }

  & .banner-text:hover {
    opacity: 0.3;
    filter: blur(10px);
    -webkit-filter: blur(10px);
  }

  & .banner-text p {
    margin-top: -24px;
    text-align: center;
    font-size: 48px;
    font-weight: 700;
    color: #ffffff;
    text-transform: uppercase;
  }

  & .color-white {
    color: white;
  }
  & .font-semibold {
    font-size: 40px;
    font-weight: 600;
  }
  & .font-big {
    font-size: 60px;
    font-weight: 700;
    text-transform: uppercase;
    text-shadow: rgb(82, 82, 91) 1px 1px 0px;
    margin-bottom: 30px;
  }
  & .text-center {
    text-align: center;
  }

  & .main-container {
    max-width: 1000px;
    display: flex;
    height: 450px;
  }

  @keyframes animate {
    
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
    
  }


`;
