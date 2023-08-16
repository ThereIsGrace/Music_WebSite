import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Image} from "@/components";

export function SearchedItems(props) {
  useEffect(() => {
    console.log(props.data);
  }, [props]);
  return (
    <>
      {props.data.type === "TRACK" &&
        props.data.list.map((track) => (
          <div>
            <div>
              <a href="#">
                <Image src={track.album.imgList[2].url} />
              </a>
            </div>
            <div>{track.name}</div>
          </div>
        ))}
      {props.data.type === "ALBUM" &&
        props.data.list.map((album) => (
          <div className="badge_area type_default">
            <div className="album_thumnail">
              {/* <div className="temp">{album.id}</div> */}
              <a href="#">
                <Image src={album.imgList[2].url} alt="앨범커버"></Image>
              </a>
            </div>
            <div className="title">{album.title}</div>
          </div>
        ))}
      {props.data.type === "ARTIST" &&
        props.data.list.map((artist) => (
          <div>
            <div>
              <a href="#">
                <Image src={artist.imgList[2].url} />
              </a>
            </div>
            <div>{artist.name}</div>
          </div>
        ))}
    </>

    // <StyledStoreContainer>
    //   <div className="storeInner">
    //     {/* <Link to="/">
    //       <Image src={props.store.imgUrl} alt="상품 이미지"></Image>
    //     </Link> */}
    //     <div className="storeContainer">
    //       <div className="storeInfo">
    //         <span className="title">{props.data.title}</span>
    //         <span className="location">{props.data.location}</span>
    //       </div>
    //       <span className="description">{props.data.description}</span>
    //       <div className="storeExtraInfo">
    //         <span>후기 {props.data.review.toLocaleString(navigator.language)}</span>
    //         <span>단골 {props.data.regular.toLocaleString(navigator.language)}</span>
    //         <span>{props.data.type}</span>
    //       </div>
    //     </div>
    //   </div>
    // </StyledStoreContainer>
  );
}
