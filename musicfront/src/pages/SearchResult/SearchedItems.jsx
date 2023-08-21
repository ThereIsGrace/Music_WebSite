import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {Image} from "@/components";

export function SearchedItems(props) {
  const songPath = "/songDetail/";
  const albumPath = "/albumDetail/";

  useEffect(() => {
    console.log(props.data);
  }, [props]);
  return (
    <>
      {props.data.type === "TRACK" &&
        props.data.list.map((track) => (
          <div className="elem type_track">
            <div className="track_thumnail">
              <Link to={songPath + track.id}>
                <Image src={track.album.imgList[2].url} alt="앨범커버" />
              </Link>
            </div>
            <div>
              <Link to={songPath + track.id}>{track.name}</Link>
            </div>
          </div>
        ))}
      {props.data.type === "ALBUM" &&
        props.data.list.map((album) => (
          <div className="elem type_album">
            <div className="album_thumnail">
              <Link to={albumPath + album.id}>
                <Image src={album.imgList[2].url} alt="앨범커버" />
              </Link>
            </div>
            <div className="title">{album.title}</div>
          </div>
        ))}
      {props.data.type === "ARTIST" &&
        props.data.list.map((artist) => (
          <div className="elem type_artist">
            <div className="artist_thumnail">
              <Link to={`/artist/${artist.id}`}>
                <Image src={artist.imgList[2].url} alt="아티스트_이미지" />
              </Link>
            </div>
            <Link to={`/artist/${artist.id}`}>
              <div>{artist.name}</div>
            </Link>
          </div>
        ))}
    </>
  );
}
