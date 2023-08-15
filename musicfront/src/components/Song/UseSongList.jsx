import React, {useEffect} from "react";
import {Product, Image, useSongs} from "@/components";
import raccoon from "@/assets/Logo/raccoon.gif";
import styled from "styled-components";
import {useRecoilState} from "recoil";
import {showLoadingAtom} from "@/components/_atom/aboutRendering";

export function UseSongList(props) {
  const {isLoadingState, songsState} = useSongs(props.excludeId, props.count, props.mode);
  const [showLoading, setShowLoading] = useRecoilState(showLoadingAtom);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [setShowLoading]);

  if (isLoadingState || showLoading) {
    return (
      <StyledLoadingImgContainer role="alert">
        <Image src={raccoon} alt="로딩로딩로딩" />
      </StyledLoadingImgContainer>
    );
  }

  return (
    <div className="productContainer">
      {songsState.map((song, index) => (
        <Product key={index} song={song} />
      ))}
    </div>
  );
}

const StyledLoadingImgContainer = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;

  & img {
    border-radius: 10%;
  }
`;
