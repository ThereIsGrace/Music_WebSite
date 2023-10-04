import {useEffect} from "react";
import {Link} from "react-router-dom";

export const TrackItem = (props) => {
  useEffect(() => {
    console.log(props.data);
  }, []);

  return (
    <>
      {props.data.map((track, index) => (
        <tr>
          <td>
            <div>{index + 1}</div>
          </td>
          <td className="info">
            <div className="info_wrap type_track">
              <div className="thumb">
                <img src={track.album.imgList[0].url} alt="앨범 이미지" />
              </div>
              <div className="txt_area">
                <Link to={"/songDetail/" + track.id}>
                  <p className="tit">
                    <span className="tit__inner">
                      <strong className="tit__text">
                        <em className="search_keyword">{track.name}</em>
                      </strong>
                    </span>
                  </p>
                </Link>
                <p className="trackInTitle">{track.album.title}</p>
              </div>
            </div>
          </td>
          <td className="artist">
            <p>
              <span className="artist_link_w">
                <span>
                  <span>
                    <span className="artist__link last">{track.representationArtist.name}</span>
                  </span>
                </span>
              </span>
            </p>
          </td>
        </tr>
      ))}
    </>
  );
};
