import React from "react";
import styled from "styled-components";
import {Image} from "@/components";
import BannerImg from "@/assets/background/banner-design1-medium-up.png";

export function LineBanner() {
  return (
    <StyledLineBanner>
      <div className="lineBanner">
        <Image src={BannerImg} alt="그냥 라인 나누는용" />
      </div>
    </StyledLineBanner>
  );
}

const StyledLineBanner = styled.div`
  margin: 0;
  padding: 0;
  background-color: black;
  & .lineBanner {
    width: 100%;
    transform: rotate(3deg);

    margin: 0 auto;
  }


  & img {
    margin: 0 auto;
    display: block;
    width: 100%;

    object-fit: contain;
    object-position: center;
  }
`;
