import {useEffect, useState} from "react";
import qs from "qs";
import styled from "styled-components";
import raccoon from "@/assets/Logo/raccoon.gif";
import {LyricsItems, SearchedItems} from "@/pages/SearchResult";
import {Pagination} from "@/pages/SearchResult";
import {atom, useRecoilState} from "recoil";

export const pageAtom = atom({
  key: "page",
  default: 1,
});

export function SearchResultBody({selectedType}) {
  const [qskeyword, setQskeyword] = useState("");
  const [data, setData] = useState([]);
  const [lyrics, setLyrics] = useState([]);
  const [coin, setCoin] = useState(false);
  const [coin2, setCoin2] = useState(false);
  const [type, setType] = useState("");
  const [page] = useRecoilState(pageAtom);

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
  const lyricsSearch = "https://www.music-flo.com/api/search/v2/search?searchType=LYRICS&sortType=ACCURACY&keyword=" + qskeyword + "&page=" + page;

  const fetchData = async () => {
    const res = await fetch(search);
    const result = res.json();
    return result;
  };

  const fetchLyricsData = async () => {
    const res = await fetch(lyricsSearch);
    const result = res.json();
    return result;
  };

  const getData = async () => {
    try {
      const result = await fetchData();
      const lyricsResult = await fetchLyricsData();
      setData(result.data);
      setLyrics(lyricsResult.data);
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
      if (data.length === 0 || lyrics.length === 0) {
        getData();
        setCoin(!coin);
      }
    }, 1000);
    console.log(lyrics.currentPage);
  }, [coin]);

  useEffect(() => {
    console.log("page 전환 중...");
    setTimeout(() => {
      if (lyrics.currentPage !== page) {
        const getLyrics = async () => {
          const result = await fetchLyricsData();
          setLyrics(result.data);
        };
        getLyrics();
        setCoin2(!coin2);
      }
    }, 100);
  }, [coin2, page]);

  useEffect(() => {
    console.log(data);
    console.log(lyrics);
  }, [data, lyrics]);

  if (data.length === 0 || lyrics.length === 0) {
    return (
      <StyledLoadingImgContainer role="alert">
        <img src={raccoon} alt="로딩 중..."></img>
      </StyledLoadingImgContainer>
    );
  }

  const filteredData = selectedType === "전체" ? data.list : data.list.filter((date) => date.type === type);
  const slicedData = filteredData.slice(0, 10);

  const lyricsData = lyrics.list.slice(0, 10);

  return (
    <div>
      <div className="list">{selectedType !== "가사" && slicedData.map((date, index) => <SearchedItems key={index} data={date} />)}</div>
      <div>
        {(selectedType === "전체" || selectedType === "가사") && (
          <StyledLryics>
            <table className="track_list_table">
              <colgroup>
                <col width="180" data-cell="곡/가사" />
                <col width="130" data-cell="아티스트" />
                <col width="150" data-cell="앨범" />
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" className="info">
                    {" "}
                    곡/가사{" "}
                  </th>
                  <th scope="col" className="artist">
                    아티스트
                  </th>
                  <th scope="col" className="album">
                    앨범
                  </th>
                </tr>
              </thead>
              <tbody>
                {selectedType === "전체" && slicedData.map((date, index) => <LyricsItems key={index + 400} data={date} />)}
                {selectedType === "가사" && lyricsData.map((lyrics, index) => <LyricsItems key={index + 400} data={lyrics} />)}
              </tbody>
            </table>
          </StyledLryics>
        )}
      </div>
      {selectedType === "가사" && <Pagination lyrics={lyrics} />}
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

const StyledLryics = styled.div`
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
