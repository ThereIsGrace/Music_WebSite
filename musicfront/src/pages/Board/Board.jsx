import {Footer, Header} from "@/components";
import {PostList} from "@/pages/Board";
import {useEffect, useState} from "react";
import {SERVER_URL} from "@/constants";
import {useRecoilState} from "recoil";
import {boardAtom, pageNumAtom, totalItemCountAtom} from "./boardAtom";
import {Helmet} from "react-helmet-async";

export function Board() {
  const [board, setBoard] = useRecoilState(boardAtom);
  const [pageNum] = useRecoilState(pageNumAtom);
  const [, setTotalCount] = useRecoilState(totalItemCountAtom);
  const [coin, setCoin] = useState(false);
  const page = pageNum - 1;

  const fetchlist = () => {
    fetch(SERVER_URL + "api/boards?page=" + page)
      .then((response) => response.json())
      .then((data) => setBoard(data._embedded.boards))
      .catch((err) => console.error(err));

    fetch(SERVER_URL + "api/boards")
      .then((response) => response.json())
      .then((data) => setTotalCount(data.page.totalElements))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log("불러오는 중");
    setTimeout(() => {
      if (board.length === 0) {
        fetchlist();
        setCoin(!coin);
      }
    }, 1000);
  }, [coin]);

  useEffect(() => {
    fetchlist();
  }, [pageNum]);

  useEffect(() => {
    console.log(board);
  }, [board]);

  return (
    <>
      <Helmet>
        <title>DJ-UP! 자유게시판</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="DJ-UP" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="DJ-UP! 자유게시판" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <PostList />
      <Footer />
    </>
  );
}
