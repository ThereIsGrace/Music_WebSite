import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {errorSelector, isLoadingRecentSelector, recentSongsAtom} from "@/components/_atom/aboutRendering";

export function useRecentSongs(limitCount) {
  const [songsState, setSongsState] = useRecoilState(recentSongsAtom);
  const [data, setData] = useState(null);
  const [renderCount, setRenderCount] = useState(0);
  const isLoading = useRecoilValue(isLoadingRecentSelector);
  const error = useRecoilValue(errorSelector);

  const fetchRdata = async () => {
    const res = await fetch("https://www.music-flo.com/api/meta/v1/track/KPOP/new?page=1&size=" + limitCount);
    const result = res.json();
    return result;
  };

  const getData = async () => {
    try {
      const result = await fetchRdata();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data === null && renderCount < 30) {
      getData();
      setRenderCount(renderCount + 1);
    }

    console.log(data);
  }, [renderCount]);

  useEffect(() => {
    if (data !== null) {
      setSongsState(data.data.list);
    }
  }, [data, setSongsState, limitCount]);

  return {isLoading, error, songsState};
}
