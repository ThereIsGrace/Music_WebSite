import { useEffect, useState } from "react";

export default function Popular() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://www.music-flo.com/api/display/v3/browser/main"
      );
      const result = res.json();
      return result;
    };

    fetchData().then((res) => setData(res));
  }, []);

  if (data.length === 0) {
    return null;
  }

  console.log(data);

  return (
    <div>
      <h2>인기곡</h2>
      {data.data.playList.trackList.map((song) => (
        <p>
          || 노래ID:{song.id} || 곡명:{song.name} || 아티스트:
          {song.artistList[0].name} || 앨범:
          {song.album.title} || 앨범ID: {song.album.id} || 앨범이미지URL(1~6):{" "}
          {song.album.imgList[2].url} ||{" "}
        </p>
      ))}
    </div>
  );
}
