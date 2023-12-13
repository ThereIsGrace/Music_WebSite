import {Image} from "@/components";
import {useEffect, useState} from "react";
import styled from "styled-components";
import raccoon from "@/assets/Logo/raccoon.gif";
import StyledLoadingImgContainer from "@/assets/Styles/StyledLoadingImgContainer";
import {useRecoilState} from "recoil";
import {songNameAtom} from "..";
import {Link} from "react-router-dom";
import axios from "axios";

export const SongDetailBody = () => {
  const [songId, setSongId] = useState("");
  const trackAPI = "https://www.music-flo.com/api/meta/v1/track/" + songId;
  const [songDetail, setSongDetail] = useState(null);
  const [coin, setCoin] = useState(false);
  const [, setSongName] = useRecoilState(songNameAtom);
  let youtubeAPI = 'https://www.googleapis.com/youtube/v3/search?';
  const [videoId, setVideoId] = useState('');




  const getYoutubeData = () => {
    if (songDetail && Object.keys(songDetail).length !== 0){
      let data = {
        q:`${songDetail.name} ${songDetail.artistList[0].name}`,
        part:"snippet",
        key:"AIzaSyAtCMtXRsdu5WfzX8-9uQN6CHRmJKLRYUw",
          type:"video",
          maxResults:1,
          regionCode:"KR"
      }
      const headers = {
        "Content-Type": `application/json;charset=UTF-8`,
        'Access-Control-Allow-Origin' : 'https://localhost:3000',
        'Access-Control-Allow-Credentials': true,
        
      }
      let uri = '';
      const makeUri = () => {
        data.q=encodeURI(data.q);
        for(var option in data){
          youtubeAPI+=option+"="+data[option]+"&";
        }
        uri = youtubeAPI.substr(0, youtubeAPI.length-1);
      }
      makeUri();
      

      axios.get(uri, {
        withCredentials: false
      })
      .then(res => {console.log(res.data.items[0].id.videoId); setVideoId(res.data.items[0].id.videoId); console.log('videoId', res.data)})
      .catch()
    }
  }

  const fetchData = async () => {
    const res = await fetch(trackAPI);
    const result = res.json();
    return result;
  };

  const getSongId = () => {
    const locationPathName = window.location.pathname;
    const getSongData = locationPathName.replace("/songDetail/", "");
    return getSongData;
  };

  const getSongDetail = async () => {
    try {
      const result = await fetchData();
      console.log(result.data.artistList[0].name, '확인');
      setSongDetail(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (songDetail === null || songDetail === undefined) {
        const getSongData = getSongId();
        setSongId(getSongData);
        getSongDetail();
        setCoin(!coin);
      } else {
        setSongName(songDetail.name);
      }
    }, 1000);
    console.log(songDetail);
  }, [coin]);

  useEffect(() => {
    getYoutubeData();
  },[coin]);

  useEffect(() => {
    console.log('videoId', videoId);
  }, [videoId]);

  if (songDetail === null || songDetail === undefined) {
    return (
      <StyledLoadingImgContainer role="alert">
        <Image src={raccoon} alt="로딩로딩로딩" />
      </StyledLoadingImgContainer>
    );
  }

  const artistType1 = () => {
    const filteredArray = [];
    for (const type of songDetail.trackArtistList) {
      if (type["roleName"] === "작사") {
        filteredArray.push(type);
      }
    }

    if (filteredArray.length === 0) return null;

    return (
      <>
        <dt>작사</dt>
        <dd>
          {filteredArray.map((artist, index) => (
            <>{index === 0 ? <>{artist.name}</> : <>, {artist.name}</>}</>
          ))}
        </dd>
      </>
    );
  };

  const artistType2 = () => {
    const filteredArray = [];
    for (const type of songDetail.trackArtistList) {
      if (type["roleName"] === "작곡") {
        filteredArray.push(type);
      }
    }

    if (filteredArray.length === 0) return null;

    return (
      <>
        <dt>작곡</dt>
        <dd>
          {filteredArray.map((artist, index) => (
            <>{index === 0 ? <>{artist.name}</> : <>, {artist.name}</>}</>
          ))}
        </dd>
      </>
    );
  };

  const artistType3 = () => {
    const filteredArray = [];
    for (const type of songDetail.trackArtistList) {
      if (type["roleName"] === "편곡") {
        filteredArray.push(type);
      }
    }

    if (filteredArray.length === 0) return null;

    return (
      <>
        <dt>편곡</dt>
        <dd>
          {filteredArray.map((artist, index) => (
            <>{index === 0 ? <>{artist.name}</> : <>, {artist.name}</>}</>
          ))}
        </dd>
      </>
    );
  };

  return (
    <StyledSongDetail>
      <div className="albumImg">
        <Image src={songDetail.album.imgList[3].url} />
      </div>
      <div className="songContent">
        <div className="titleDescription">{songDetail.name}</div>
        <div className="artistDescription">{songDetail.representationArtist.name}</div>
        <div className="descriptionDescription">
          <Link to={"/albumDetail/" + songDetail.album.id}>{songDetail.album.title}</Link>
        </div>
        <div>
          <dl>
            {artistType1()}
            {artistType2()}
            {artistType3()}
            <dt>가사</dt>
            <dd></dd>
          </dl>
        </div>
        <div className="lyrics">{songDetail.lyrics}</div>
        {videoId && <iframe
            id="ytplayer"
            type="text/html"
            width="720"
            height="405"
            src={`https://www.youtube.com/embed/${videoId}`}
            frameborder="0"
            allowfullscreen="allowfullscreen">
        </iframe>}
      </div>
    </StyledSongDetail>
  );
};

const StyledSongDetail = styled.div`
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

  & .songContent {
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
    text-align: center;
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

  & a {
    color: black;
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
