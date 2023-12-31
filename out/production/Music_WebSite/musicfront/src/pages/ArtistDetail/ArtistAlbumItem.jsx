import {Image} from "@/components";
import {Link} from "react-router-dom";
import styled from "styled-components";

export const ArtistAlbumItem = (props) => {
  return (
    <StyledProductContainer>
      <Link to={`/albumDetail/${props.data.id}`}>
        <Image src={props.data.imgList[2].url} alt="앨범_이미지"></Image>
      </Link>
      <Link to={`/albumDetail/${props.data.id}`}>
        <span className="title">{props.data.title}</span>
      </Link>
      <span className="artist">{props.data.representationArtist.name}</span>
    </StyledProductContainer>
  );
};

const StyledProductContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 212px;
  height: 320px;
  margin: 0px 10px 0px 10px;

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
    color: #212529;
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
    color: #212529;
    margin-top: 3px;
    font-weight: 500;
    font-size: 15px;
    line-height: 22px;
  }

  & .album {
    display: block;
    font-style: normal;
    color: #212529;
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
    color: #868e96;
  }
`;
