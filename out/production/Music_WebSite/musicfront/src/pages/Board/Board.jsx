import {Footer, Header} from "@/components";
import {PostList} from "@/pages/Board";
import {useEffect, useState} from "react";
import {SERVER_URL} from "@/constants";
import {useRecoilState} from "recoil";
import {boardAtom, pageNumAtom, totalItemCountAtom} from "./boardAtom";
import {Helmet} from "react-helmet-async";
import axios from "axios";
import axiosInstance from "@/axios_interceptor/axios_interceptor";

export function Board() {
  const [board, setBoard] = useRecoilState(boardAtom);
  const [pageNum, setPageNum] = useRecoilState(pageNumAtom);
  const [totalCount, setTotalCount] = useRecoilState(totalItemCountAtom);
  const [coin, setCoin] = useState(false);


  useEffect(() => {
    setPageNum(1);
  }, []);

  const boardList = () => {
    axios.get(SERVER_URL + `boardlist?page=${pageNum-1}`)
    .then(response => {console.log(response, 'board'); setBoard(response.data.data.content); setTotalCount(response.data.data.totalElements);})
    .catch(error => console.error(error))
  }

  useEffect(() => {
    boardList();
  }, [pageNum]);


  return (
    <>
      <Helmet>
        <title>MusicCat 자유게시판</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="MusicCat" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="MusicCat 자유게시판" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <PostList board={board}/>
      <Footer style={{bottom: '0'}}/>
    </>
  );
}

