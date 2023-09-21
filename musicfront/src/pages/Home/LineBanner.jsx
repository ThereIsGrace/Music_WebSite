import React from "react";
import styled from "styled-components";
import {Image} from "@/components";
import BannerImg from "@/assets/Home/fc.png";

export function LineBanner() {
  return (
    <StyledLineBanner>
      <div className="lineBanner">
        <Image src={BannerImg} alt="우리동네 알바찾기 라인 배너" />
      </div>
    </StyledLineBanner>
  );
}

const StyledLineBanner = styled.div`

  & .lineBanner {
    width: 800px;
    height: 200px;
    margin: 0 auto;
  }


  & img {
    margin: 0 auto;
    display: block;
    width: 100%;
    height: 300px;
    object-fit: contain;
    object-position: center;
  }
`;
