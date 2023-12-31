import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {errorSelector, isLoadingPopularSelector, popularSongsAtom, popularSongsExcludeIdAtom} from "@/components/_atom/aboutRendering";

export function usePopularSongs(excludeId, limitCount = 99) {
  const [songsState, setSongsState] = useRecoilState(!excludeId ? popularSongsAtom : popularSongsExcludeIdAtom);
  const [data, setData] = useState(null);
  const [coin, setCoin] = useState(false);
  const isLoading = useRecoilValue(isLoadingPopularSelector);
  const error = useRecoilValue(errorSelector);

  const fetchPdata = async () => {
    const res = await fetch("https://www.music-flo.com/api/display/v3/browser/main");
    const result = res.json();
    return result;
  };

  const getData = async () => {
    try {
      const result = await fetchPdata();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (data === null) {
        getData();
        setCoin(!coin);
      }
    }, 800);
    console.log(data);
  }, [coin]);

  useEffect(() => {
    if (data !== null) {
      setSongsState(data.data.playList.trackList);
    }
  }, [data, setSongsState, excludeId, limitCount]);

  return {isLoading, error, songsState};
}
