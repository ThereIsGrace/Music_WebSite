import React, {useEffect} from "react";
import styled from "styled-components";

export const LyricsItems = (props) => {
  useEffect(() => {
    console.log(props.data);
  }, []);

  return (
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
          {props.data.type === "LYRICS" &&
            props.data.list.map((lyrics) => (
              <tr>
                <td className="info">
                  <div className="info_wrap type_lyrics">
                    <div className="thumb">
                      <img src={lyrics.album.imgList[0].url} alt="앨범 이미지" />
                    </div>
                    <div className="txt_area">
                      <button type="button" className="tit-play">
                        <p className="tit">
                          <span className="tit__inner">
                            <strong className="tit__text">
                              <em className="search_keyword">{lyrics.name}</em>
                            </strong>
                          </span>
                        </p>
                      </button>
                      <div className="desc">
                        <p className="album">{lyrics.lyrics}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="artist">
                  <p>
                    <span className="artist_link_w">
                      <span>
                        <span>
                          <span className="artist__link last">{lyrics.artistList[0].name}</span>
                        </span>
                      </span>
                    </span>
                  </p>
                </td>
                <td className="album">
                  <a href="#">{lyrics.album.title}</a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </StyledLryics>
  );
};

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
