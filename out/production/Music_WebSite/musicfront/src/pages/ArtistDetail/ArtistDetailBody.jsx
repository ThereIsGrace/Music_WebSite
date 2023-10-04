import StyledLoadingImgContainer from "@/assets/Styles/StyledLoadingImgContainer";
import raccoon from "@/assets/Logo/raccoon.gif";
import {Image} from "@/components";
import {useEffect, useState} from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {ArtistAlbums, ArtistTracks} from "@/pages/ArtistDetail";
import {ArtistTypesTab} from "./ArtistTypesTab";
import {atom, useRecoilState} from "recoil";

export const pageAtom = atom({
  key: "page",
  default: 1,
});

export const pageAtom2 = atom({
  key: "page2",
  default: 1,
});

export const loadTrackAtom = atom({
  key: "loadTrack",
  default: "off",
});

export const loadAlbumAtom = atom({
  key: "loadAlbum",
  default: "off",
});

export const ArtistDetailBody = () => {
  const [artistId, setArtistId] = useState("");
  const [artistMain, setArtistMain] = useState(null);
  const [artistAlbum, setArtistAlbum] = useState(null);
  const [artistAlbumFiltered, setArtistAlbumFiltered] = useState(null);
  const [artistTrack, setArtistTrack] = useState(null);
  const [artistTrackFiltered, setAritstTrackFiltered] = useState(null);
  const [page] = useRecoilState(pageAtom);
  const [page2] = useRecoilState(pageAtom2);
  const [coin, setCoin] = useState(false);
  const [coin2, setCoin2] = useState(false);
  const [coin3, setCoin3] = useState(false);
  const [loadTrack, setLoadTrack] = useRecoilState(loadTrackAtom);
  const [loadAlbum, setLoadAlbum] = useRecoilState(loadAlbumAtom);
  const [selectedType, setSelectedType] = useState("곡");
  const [totalPageofTrack, setTotalPageofTrack] = useState(0);
  const [totalPageofAlbum, setTotalPageofAlbum] = useState(0);

  const artistAPI = "https://www.music-flo.com/api/meta/v1/artist/" + artistId;
  const artistTrackAPI = "https://www.music-flo.com/api/meta/v1/artist/" + artistId + "/track?size=20&page=" + page;
  const artistAlbumAPI = "https://www.music-flo.com/api/meta/v1/artist/" + artistId + "/album?size=20&page=" + page2;

  const fetchData = async () => {
    const res = await fetch(artistAPI);
    const result = res.json();
    return result;
  };

  const fetchTracksData = async () => {
    const res = await fetch(artistTrackAPI);
    const result = res.json();
    return result;
  };

  const fetchAlbumData = async () => {
    const res = await fetch(artistAlbumAPI);
    const result = res.json();
    return result;
  };

  const getArtistId = () => {
    const locationPathName = window.location.pathname;
    const getAlbumData = locationPathName.replace("/artist/", "");
    return getAlbumData;
  };

  const getArtistSummary = async () => {
    try {
      const result = await fetchData();
      setArtistMain(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getArtistTrack = async () => {
    try {
      const trackResult = await fetchTracksData();

      setAritstTrackFiltered(trackResult.data);
    } catch (err) {
      console.error(err);
    }
  };

  const getArtistAlbum = async () => {
    try {
      const albumResult = await fetchAlbumData();

      setArtistAlbumFiltered(albumResult.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    console.log("start================================");
    setTimeout(() => {
      if (artistMain === null || artistMain === undefined || artistTrack === null || artistTrack === undefined || artistAlbum === null || artistAlbum === undefined) {
        const getArtistData = getArtistId();
        setArtistId(getArtistData);
        getArtistSummary();
        getArtistTrack();
        getArtistAlbum();
        setArtistTrack(artistTrackFiltered);
        setArtistAlbum(artistAlbumFiltered);
        setCoin(!coin);
      } else {
        const totalCountT = artistTrack.totalCount;
        const totalCountA = artistAlbum.totalCount;
        setTotalPageofTrack(Math.trunc(totalCountT / 20) + 1);
        setTotalPageofAlbum(Math.trunc(totalCountA / 20) + 1);
      }
    }, 1000);
    setAritstTrackFiltered(null);
    setArtistAlbumFiltered(null);
    console.log(artistMain);
    console.log(artistTrack);
    console.log(totalPageofTrack);
    console.log(artistAlbum);
  }, [coin]);

  useEffect(() => {
    console.log(loadTrack);
    console.log(page);

    if (loadTrack === "on") {
      setTimeout(() => {
        getArtistTrack();
        setCoin2(!coin2);
      }, 1000);
      if (artistTrackFiltered.currentPage === page) {
        setArtistTrack(artistTrackFiltered);
        setLoadTrack("off");
      }
      if (artistTrack.currentPage === page) {
        setAritstTrackFiltered(null);
      }
    }
    console.log(artistTrack);
  }, [coin2, page, setLoadTrack]);

  useEffect(() => {
    console.log(loadAlbum);
    console.log(page2);
    if (loadAlbum === "on") {
      setTimeout(() => {
        getArtistAlbum();
        setCoin3(!coin3);
      }, 1000);
      if (artistAlbumFiltered.currentPage === page2) {
        setArtistAlbum(artistAlbumFiltered);
        setLoadAlbum("off");
      }
      if (artistAlbum.currentPage === page2) {
        setArtistAlbumFiltered(null);
      }
    }
    console.log(artistAlbum);
  }, [coin3, page2, setLoadAlbum]);

  if (artistMain === null || artistMain === undefined || artistTrack === null || artistTrack === undefined || artistAlbum === null || artistAlbum === undefined) {
    return (
      <StyledLoadingImgContainer role="alert">
        <Image src={raccoon} alt="로딩로딩로딩" />
      </StyledLoadingImgContainer>
    );
  }

  return (
    <>
      <StyledAlbumDetail>
        <div className="albumImg">
          <Link to={window.location.pathname}>
            <Image src={artistMain.imgList[3].url} />
          </Link>
        </div>
        <div className="albumContent">
          <div className="titleDescription">{artistMain.name}</div>
        </div>
        <StyledStore>
          <ArtistTypesTab onSelectType={setSelectedType} />
        </StyledStore>
        <ArtistTracks data={artistTrack} selectedType={selectedType} totalPage={totalPageofTrack} />
        <ArtistAlbums data={artistAlbum} selectedType={selectedType} totalPage={totalPageofAlbum} />
      </StyledAlbumDetail>
    </>
  );
};

const StyledAlbumDetail = styled.div`
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

  & .userImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
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

  & .textContainer {
    display: flex;
    width: 678px;
    margin: 0 auto;
    justify-content: space-between;
  }

  & .textContainer a {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 21px;
    color: #ff8a3d;
  }

  & .allTracks.inactive {
    display: none;
  }

  & .allAlbums.inactive {
    display: none;
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

const StyledStore = styled.div`
  margin-bottom: 80px;
  margin-top: 100px;

  & .inner {
    margin: 65px auto 85px;
    width: 1056px;
  }

  & h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 48px;
    text-align: center;
    color: #212124;
  }

  & .list {
    width: 768px;
    margin: 10px auto 0;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(2, 1fr);
    column-gap: 32px;
    justify-items: center;
  }

  & .elem {
    margin-bottom: 50px;
  }

  & a {
    color: black;
  }
`;
