import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Image} from "@/components";

export function RecentSong(props) {
  const song = props.song;
  const color = props.color;
  return (
    <StyledProductContainer>
      <Link to={`/songDetail/${song.id}`}>
        <Image src={song.album.imgList[2].url} alt="앨범 이미지"></Image>
      </Link>
      <Link to={`/songDetail/${song.id}`}>
        <span className="title" style={{color: `${color}`}}>{song.name}</span>
      </Link>
      <Link to={`/artist/${song.representationArtist.id}`}>
        <span className="artist" style={{color: `${color}`}}>{song.representationArtist.name}</span>
      </Link>
      <Link to={`/albumDetail/${song.album.id}`}>
        <span className="album"  style={{color: `${color}`}}>{song.album.title}</span>
      </Link>
    </StyledProductContainer>
  );
}

const StyledProductContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 212px;
  height: 320px;

  & img {
    border-radius: 12px;
    box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.15);
    display: block;
    width: 100%;
    height: 212px;
    object-fit: cover;
  }

  & a {
    margin: 0;
  }

  & .title {
    font-style: normal;
    margin-top: 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .artist {
    display: block;
    font-style: normal;
    margin-top: 3px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
  }

  & .album {
    display: block;
    font-style: normal;
    margin-top: 3px;
    font-size: 13px;
    line-height: 20px;
  }

  & .interest {
    display: block;
    font-style: normal;
    margin-top: 3px;
    font-size: 12px;
    line-height: 14px;
  }
`;
