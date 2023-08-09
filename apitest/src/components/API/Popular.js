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
    </div>
  );
}
