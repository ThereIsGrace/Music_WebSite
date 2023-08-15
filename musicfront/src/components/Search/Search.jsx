import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {keywordAtom} from "@/components/_atom/aboutRendering";
import {useNavigate} from "react-router-dom";

export function Search() {
  const [keyword, setKeyword] = useRecoilState(keywordAtom);
  const nav = useNavigate();

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    console.log(keyword);
    console.log(window.location.pathname);
  });

  const pressKey = (e) => {
    if (e.keyCode === 13) {
      if (window.location.pathname === "/search") {
        window.location.reload();
        // queryString 활용
      }
      nav("/search");
    }
  };

  return (
    <div>
      <input type="text" value={keyword} onChange={onChange} onKeyDown={pressKey} placeholder="아티스트/앨범/노래 검색하기" />
    </div>
  );
}
