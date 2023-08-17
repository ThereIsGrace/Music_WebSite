import {useEffect, useState} from "react";
import qs from "qs";
import styled from "styled-components";
import raccoon from "@/assets/Logo/raccoon.gif";
import {Lyrics, LyricsItems, SearchedItems} from "@/pages/SearchResult";

export function SearchResultBody({selectedType}) {
  const [qskeyword, setQskeyword] = useState("");
  const [data, setData] = useState([]);
  // const [renderCount, setRenderCount] = useState(0);
  const [coin, setCoin] = useState(false);
  const [type, setType] = useState("");

  const selectingType = () => {
    if (selectedType === "곡") {
      setType("TRACK");
    } else if (selectedType === "앨범") {
      setType("ALBUM");
    } else if (selectedType === "아티스트") {
      setType("ARTIST");
    } else if (selectedType === "가사") {
      setType("LYRICS");
    }
  };

  useEffect(() => {
    selectingType();
  }, [selectedType]);

  const search = "https://www.music-flo.com/api/search/v2/search/integration?keyword=" + qskeyword;

  const fetchData = async () => {
    const res = await fetch(search);
    const result = res.json();
    return result;
  };

  const getData = async () => {
    try {
      const result = await fetchData();
      setData(result.data);
    } catch (err) {
      console.error(err);
    }
  };

  const query = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  });

  useEffect(() => {
    setTimeout(() => {
      setQskeyword(query.keyword);
      if (data.length === 0) {
        getData();
        setCoin(!coin);
        //   setRenderCount(renderCount + 1);
      }
      console.log(window.location);
    }, 1000);
  }, [coin]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data.length === 0) {
    return (
      <StyledLoadingImgContainer role="alert">
        <img src={raccoon} alt="로딩 중..."></img>
      </StyledLoadingImgContainer>
    );
  }

  const filteredData = selectedType === "전체" ? data.list : data.list.filter((date) => date.type === type);
  const slicedData = filteredData.slice(0, 10);

  return (
    <div>
      <div className="list">{selectedType !== "가사" && slicedData.map((date, index) => <SearchedItems key={index} index={index} data={date} />)}</div>
      <div>{selectedType === "가사" && slicedData.map((date, index) => <LyricsItems key={index + 100} data={date} />)}</div>
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
