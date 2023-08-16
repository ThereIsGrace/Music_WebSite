import {useEffect, useState} from "react";
import qs from "qs";

export function SearchResultBody() {
  const [qskeyword, setQskeyword] = useState("");
  const [data, setData] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const [coin, setCoin] = useState(false);

  const search = "https://www.music-flo.com/api/search/v2/search/integration?keyword=" + qskeyword;

  const fetchData = async () => {
    const res = await fetch(search);
    const result = res.json();
    return result;
  };

  const getData = async () => {
    try {
      const result = await fetchData();
      setData(result);
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
      if (data.length === 0) {
        getData();
        setCoin(!coin);
        //   setRenderCount(renderCount + 1);
      }
      console.log(window.location);
    }, 1000);
  }, [coin]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (data.length === 0) {
    return <div>loading........</div>;
  }

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
