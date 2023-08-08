import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export function Recent() {
  const [rdata, setRdata] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://www.music-flo.com/api/meta/v1/track/KPOP/new?page=1&size=100"
      );
      const result = res.json();
      return result;
    };

    fetchData().then((res) => setRdata(res));
  }, []);

  console.log(rdata);

  return (
    <div>
      <h2>최신곡</h2>

      {rdata.data.list.map((d) => (
        <p>
          곡이름:{d.name} / 앨범:{d.album.title} / 아티스트:
          {d.artistList[0].name}
        </p>
      ))}
    </div>
  );
}

export function Popular() {
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

  console.log(data);

  return (
    <div>
      <h2>인기곡</h2>
      {/*         
      {data.map((d) => (
        <Link key={d.id} to={`${d.id}`}>
          {d.title}
        </Link>
      ))}
 */}
    </div>
  );
}
