import React, { useState, useEffect } from "react";

export default function Recent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://www.music-flo.com/api/meta/v1/track/KPOP/new?page=1&size=100"
      );
      const result = res.json();
      return result;
    };

    fetchData().then((res) => setData(res.data.list));
  }, []);

  if (data.length === 0) {
    return null;
  }

  console.log(data);

  return (
    <div>
      <h2>최신곡</h2>
      {data.map((song) => (
        <p>
          || 노래ID:{song.id} || 곡명:{song.name} || 아티스트:
          {song.artistList[0].name} || 앨범:
          {song.album.title} || 앨범ID: {song.album.id} || 앨범이미지URL(1~6):{" "}
          {song.album.imgList[2].url} || 장르: {song.album.genreStyle} ||{" "}
        </p>
      ))}
    </div>
  );
}
