import { useState } from "react";

export default function Search() {
  const [keyword, setKeyword] = useState("");

  const search =
    "https://www.music-flo.com/api/search/v2/search/integration?keyword=" +
    keyword;

  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const pressKey = (e) => {
    if (e.keyCode === 13) {
      window.open(search);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={onChange}
        onKeyDown={pressKey}
        placeholder="검색"
      />
    </div>
  );
}
