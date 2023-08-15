import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {errorSelector, isLoadingSelector, productsAtom, productsExcludeIdAtom} from "@/components/_atom/aboutRendering";

export function useSongs(excludeId, limitCount = 99, mode) {
  const [songsState, setSongsState] = useRecoilState(!excludeId ? productsAtom : productsExcludeIdAtom);
  const isLoading = useRecoilValue(isLoadingSelector);
  const error = useRecoilValue(errorSelector);

  const fetchPdata = async () => {
    const res = await fetch("https://www.music-flo.com/api/display/v3/browser/main");
    const result = res.json();
    return result;
  };

  useEffect(() => {
    console.log(mode);
    if (mode === "popular") {
      fetchPdata().then((res) => setSongsState(res));
    }
  }, [setSongsState, excludeId, limitCount, mode]);

  return {isLoading, error, songsState};
}
