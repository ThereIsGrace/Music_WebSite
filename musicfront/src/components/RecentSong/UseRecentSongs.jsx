import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {errorSelector, isLoadingRecentSelector, recentSongsAtom} from "@/components/_atom/aboutRendering";
import { recentPageNumAtom, totalSongAtom } from "@/pages/Home/homeAtoms";

export function useRecentSongs(limitCount) {
  const [songsState, setSongsState] = useRecoilState(recentSongsAtom);
  const [data, setData] = useState(null);
  const [renderCount, setRenderCount] = useState(0);
  const isLoading = useRecoilValue(isLoadingRecentSelector);
  const error = useRecoilValue(errorSelector);
  const [totalCount, setTotalCount] = useRecoilState(totalSongAtom);
  const recentPageNum = useRecoilValue(recentPageNumAtom);

  const fetchRdata = async () => {
    const res = await fetch(`https://www.music-flo.com/api/meta/v1/track/KPOP/new?page=${recentPageNum}&size=10`);
    const result = res.json();
    return result;
  };

  const getData = async () => {
    try {
      const result = await fetchRdata();
      setTotalCount(result.data.totalCount);
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, [recentPageNum]);

  useEffect(() => {
    if (data === null && renderCount < 30) {
      getData();
      setRenderCount(renderCount + 1);
    }
  }, [renderCount]);

  useEffect(() => {
    if (data !== null) {
      setSongsState(data.data.list);
    }
  }, [data, setSongsState, limitCount]);

  return {isLoading, error, songsState};
}
