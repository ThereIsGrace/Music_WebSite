import React, {useEffect} from "react";
import {Link} from "react-router-dom";

export const LyricsItems = (props) => {
  useEffect(() => {
    console.log(props.data);
  }, []);

  return (
    <>
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
              <Link to="#">{lyrics.album.title}</Link>
            </td>
          </tr>
        ))}
    </>
  );
  // }
};
