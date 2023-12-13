import styled from "styled-components";
import {Link} from "react-router-dom";
import {Heading2, UseRecentSongList} from "@/components";
import bg from "@/assets/background/bg.png";
import { Paging } from "./Paging";
import { useEffect } from "react";
import { recentPageNumAtom, totalSongAtom } from "./homeAtoms";
import { useRecoilState, useRecoilValue } from "recoil";

export function MainSong() {
  const songCount = useRecoilValue(totalSongAtom);
  const [recentPageNum, setRecentPageNum] = useRecoilState(recentPageNumAtom); 
  const recentSongCount = useRecoilValue(totalSongAtom);
  useEffect(()=>{
    setRecentPageNum(1);
  }, []);
  return (
    <StyledProduct>
      <div className="inner">
        <Heading2>최신 음악</Heading2>
        <p className="count">전체음악수 {recentSongCount}</p>
        <UseRecentSongList color={'white'}/>
        <Paging />
      </div>
    </StyledProduct>
  );
}

const StyledProduct = styled.div`
background-image: url(${bg});
padding-top: 30px;
padding-bottom: 30px;

  & .inner {
    margin: 65px auto 85px;
    width: 70%;
  }

  & h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 54px;
    align-items: center;
    text-align: center;
    color: white;
  }

  & .count {
    font-size: 15px;
    color: white;
    float: right;
  }

  & .productContainer {
    margin-top: 85px;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(5, 1fr);
    gap: 55px;
    justify-items: center;
  }

  & .recent {
    margin-top: 55px;
    display: block;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.3px;
    text-decoration-line: underline;
    color: white;
  }
`;
