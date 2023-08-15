import {useRecoilState} from "recoil";
import {keywordAtom} from "@/components/_atom/aboutRendering";
import {useEffect, useState} from "react";

export function SearchResultBody() {
  const [keyword] = useRecoilState(keywordAtom);
  const [data, setData] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const [coin, setCoin] = useState(false);

  const search = "https://www.music-flo.com/api/search/v2/search/integration?keyword=" + keyword;

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

  useEffect(() => {
    console.log(keyword);
    setTimeout(() => {
      if (data.length === 0) {
        getData();
        setCoin(!coin);
        //   setRenderCount(renderCount + 1);
      }
      console.log(data);
    }, 1000);
  }, [coin]);

  if (data.length === 0) {
    return <div>loading........</div>;
  }

  return (
    <>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
