import styled from "styled-components";
import {ArtistTrackItem, loadTrackAtom, pageAtom} from "@/pages/ArtistDetail";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";

export const ArtistTracks = ({data, selectedType, totalPage}) => {
  const [currentData, setCurrentData] = useState([]);
  const [prevData, setPrevData] = useState([]);
  const [page, setPage] = useRecoilState(pageAtom);
  const [, setLoadTrack] = useRecoilState(loadTrackAtom);
  const [isActive, setIsActive] = useState(false);

  const loadData = async () => {
    const newData = data.list;
    if (newData.length !== 0 && newData !== prevData) {
      setPrevData(newData);
      setCurrentData((prev) => [...prev, ...newData]);
      console.log(currentData);
    }
  };

  const handleButton = () => {
    setPage(page + 1);
    setLoadTrack("on");
  };

  useEffect(() => {
    loadData();
  }, [data]);

  useEffect(() => {
    if (selectedType === "곡") {
      setIsActive(true);
    } else if (selectedType !== "곡") {
      setIsActive(false);
    }
  }, [selectedType]);

  return (
    <div className={isActive ? "allTracks active" : "allTracks inactive"}>
      <StyledTracklist>
        <table className="track_list_table">
          <colgroup>
            <col width="130" data-cell="곡/앨범" />
            <col width="150" data-cell="아티스트" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="info">
                곡/앨범
              </th>
              <th scope="col" className="artist">
                아티스트
              </th>
            </tr>
          </thead>
          <tbody>{currentData && currentData.map((track) => <ArtistTrackItem key={track.id} track={track} />)}</tbody>
        </table>
      </StyledTracklist>
      {/* <button onClick={handleButton}>펼치기</button> */}
      {totalPage <= page ? <></> : <button onClick={handleButton}>펼치기</button>}
    </div>
  );
};

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

  a {
    color: black; /* 텍스트 색깔을 까맣게 설정 */
    text-decoration: none; /* 밑줄 제거 */
  }

  a:hover {
    text-decoration: underline; /* 마우스 갖다대면 밑줄 추가 */
  }

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

  .track_list_table {
    width: auto;
    min-width: 60%;
    max-width: none;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .info_wrap.type_track {
    display: flex;
  }

  .track_list_table td.info .info_wrap.type_track {
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

  .track_list_table td.info {
    padding-left: 5px;
    text-align: left;
  }

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
    margin-top: 20px;
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

  .trackInTitle {
    margin-top: 5px;
    font-weight: 200;
    font-size: 15px;
  }

  .track_list_table td.info .txt_area .tit-play {
    min-width: 0;
    max-width: 100%;
    text-align: left;
  }

  .track_list_table td.info .info_wrap.type_track .album {
    display: block;
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

    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    line-height: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: center;
    writing-mode: horizontal-tb !important;
  }
`;
