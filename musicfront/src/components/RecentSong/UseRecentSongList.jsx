import React, {useEffect} from "react";
import {Image, useRecentSongs} from "@/components";
import raccoon from "@/assets/Logo/raccoon.gif";
import styled from "styled-components";
import {useRecoilState, useRecoilValue} from "recoil";
import {showLoadingAtom} from "@/components/_atom/aboutRendering";
import {RecentSong} from "./RecentSong";
import { recentPageNumAtom, totalSongAtom } from "@/pages/Home/homeAtoms";

export function UseRecentSongList(props) {
  const color = props.color;
  const {isLoadingState, songsState} = useRecentSongs(props.count);
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
        <Image src={raccoon} alt="로딩" />
      </StyledLoadingImgContainer>
    );
  }

  return (
    <div className="productContainer">
      {songsState.map((song, index) => (
        <RecentSong key={index} song={song} color={color}/>
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
