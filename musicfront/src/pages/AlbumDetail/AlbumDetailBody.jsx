import StyledLoadingImgContainer from "@/assets/Styles/StyledLoadingImgContainer";
import raccoon from "@/assets/Logo/raccoon.gif";
import {Image} from "@/components";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {albumNameAtom} from "..";
import styled from "styled-components";
import {TrackItem} from "@/pages/AlbumDetail";

export const AlbumDetailBody = () => {
  const [albumId, setAlbumId] = useState("");
  const albumAPI = "https://www.music-flo.com/api/meta/v1/album/" + albumId;
  const trackAPI = "https://www.music-flo.com/api/meta/v1/album/" + albumId + "/track";
  const [albumDetail, setAlbumDetail] = useState(null);
  const [tracklist, setTrackList] = useState([]);
  const [coin, setCoin] = useState(false);
  const [, setAlbumName] = useRecoilState(albumNameAtom);

  const fetchData = async () => {
    const res = await fetch(albumAPI);
    const result = res.json();
    return result;
  };

  const fetchTracksData = async () => {
    const res = await fetch(trackAPI);
    const result = res.json();
    return result;
  };

  const getAlbumId = () => {
    const locationPathName = window.location.pathname;
    const getAlbumData = locationPathName.replace("/albumDetail/", "");
    return getAlbumData;
  };

  const getAlbumDetail = async () => {
    try {
      const result = await fetchData();
      const trackResult = await fetchTracksData();
      setAlbumDetail(result.data);
      setTrackList(trackResult.data.list);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (albumDetail === null || albumDetail === undefined || tracklist.length === 0) {
        const getAlbumData = getAlbumId();
        setAlbumId(getAlbumData);
        getAlbumDetail();
        setCoin(!coin);
      } else {
        setAlbumName(albumDetail.name);
      }
    }, 1000);
    console.log(albumDetail);
    console.log(tracklist);
  }, [coin]);

  if (albumDetail === null || albumDetail === undefined) {
    return (
      <StyledLoadingImgContainer role="alert">
        <Image src={raccoon} alt="로딩로딩로딩" />
      </StyledLoadingImgContainer>
    );
  }

  return (
    <StyledAlbumDetail>
      <div className="albumImg">
        <Image src={albumDetail.imgList[3].url} />
      </div>
      <div className="albumContent">
        <div className="titleDescription">{albumDetail.name}</div>
        <div className="artistDescription">{albumDetail.representationArtist.name}</div>
        <div></div>
        <StyledTracklist>
          <table className="track_list_table">
            <colgroup>
              <col width="180" data-cell="곡/가사" />
              <col width="130" data-cell="아티스트" />
              <col width="150" data-cell="앨범" />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">번호</th>
                <th scope="col" className="info">
                  곡/앨범
                </th>
                <th scope="col" className="artist">
                  아티스트
                </th>
              </tr>
            </thead>
            <tbody>
              <TrackItem data={tracklist} />
            </tbody>
          </table>
        </StyledTracklist>
      </div>
    </StyledAlbumDetail>
  );
};

const StyledAlbumDetail = styled.div`
  & .productContainer {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    justify-items: center;
    margin-right: 0;
  }

  & .albumImg {
    margin: 200px auto 0 auto;
    width: 350px;
    height: 360px;
  }

  & .albumContent {
    white-space: pre-wrap;
    margin: 0px auto;
    width: 600px;
  }

  & dl dt {
    float: left;
    width: 48px;
    padding-top: 20px;
    font-weight: 700;
  }

  & dt {
    display: block;
  }

  & dd {
    display: block;
    margin-inline-start: 40px;
    padding-top: 21px;
    margin-left: 48px;
  }

  & .lyrics {
    margin-top: 21px;
  }

  & .userInfoContainer {
    display: flex;
    width: 678px;
    height: 60px;
    margin: 24px auto;
    align-items: center;
  }

  & .userInfoImgContainer {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 8px;
  }

  & .userImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & .spanContainer {
    line-height: 20px;
  }

  & .spanContainer span {
    display: block;
  }

  & .userId {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    color: #212529;
  }

  & .userLocation {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    color: #212529;
  }

  /* & .productDescription {
    width: 678px;
    height: 84px;
    margin: 36px auto;
  }

  & .mainImg {
    width: 678px;
    height: 564px;
    margin-bottom: 25px;
    border-radius: 8px;
  } */

  & .titleDescription {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
  }

  & .artistDescription {
    display: block;
    font-style: normal;
    color: #212529;
    font-weight: 700;
    font-size: 15px;
    line-height: 30px;
    text-align: center;
  }

  & .descriptionDescription {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 30px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & .interestDescription {
    display: block;
    font-style: normal;
    margin-top: 3px;
    font-size: 12px;
    line-height: 3 px;
    color: #868e96;
  }

  & .popularProduct {
    width: 678px;
    height: 100%;
    margin: 0 auto;
  }

  & .textContainer {
    display: flex;
    width: 678px;
    margin: 0 auto;
    justify-content: space-between;
  }

  & .textContainer span,
  a {
    margin: 36px 0 0 0;
  }

  & .textContainer span {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
  }

  & .textContainer a {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 21px;
    color: #ff8a3d;
  }

  & a:hover {
    font-weight: 600;
  }

  & .map {
    width: 100%;
    height: 200px;
    margin: 50px 0 30px;
    background: black;
  }
`;

const StyledTracklist = styled.div`
  width: 100%;
  font-family: Pretendard Variable, Pretendard, -apple-system, BlinkMacSystemFont, Roboto, Segoe UI, Helvetica, sans-serif;
  font-size: 100%;
  font-weight: 400;
  color: #333;
  background-color: #fff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: none;
  -moz-text-size-adjust: none;
  -ms-text-size-adjust: none;
  text-size-adjust: none;
  text-align: center;

  table {
    width: 800px;
    margin: 50px auto;
    border-collapse: separate;
    text-indent: initial;
    border-spacing: 2px;
  }
  th {
    padding: 10px;
    border: 1px solid #ccc;
  }

  .help_list_table,
  .track_list_table {
    width: auto;
    min-width: 60%;
    max-width: none;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .info_wrap.type_lyrics {
    display: flex;
  }

  .help_list_table td.info .info_wrap.type_lyrics,
  .track_list_table td.info .info_wrap.type_lyrics {
    max-width: 664px;
    padding-right: 10px;
  }

  img {
    margin: 0px 10px 0px 10px;
  }

  td {
    display: table-cell;
    vertical-align: middle;
  }

  .help_list_table td.info,
  .track_list_table td.info {
    padding-left: 5px;
    text-align: left;
  }

  .help_list_table td,
  .track_list_table td {
    position: relative;
    height: 84px;
    text-align: center;
    border-bottom: 1px solid #f6f6f6;
  }

  td.info .txt_area {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    min-width: 130px;
    max-width: 440px;
    height: 100%;
  }

  .track_list_table td.info .txt_area .tit-play {
    min-width: 0;
    max-width: 100%;
    text-align: left;
  }

  .track_list_table td.info .info_wrap.type_lyrics .album {
    display: block;
    display: -webkit-box;
    overflow: hidden;
    height: 40px;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding-top: 3px;
    line-height: 1.54;
    white-space: pre-wrap;
  }

  colgroup {
    display: table-column-group;
  }

  tr {
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }

  p.album {
    font-size: smaller;
    display: block;
    display: -webkit-box;
    overflow: hidden;
    height: 100px;
    text-overflow: ellipsis;
    word-break: break-all;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    padding-top: 3px;
    line-height: 1.54;
    white-space: pre-wrap;
  }

  button {
    margin: 0;
    border: 0;
    cursor: pointer;
    background-color: transparent;
    outline: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    padding: 0;
    font-family: inherit;
    vertical-align: middle;
  }

  button {
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: center;
    cursor: default;
    writing-mode: horizontal-tb !important;
  }
`;
