import {Footer, Header} from "@/components";
import {SERVER_URL} from "@/constants";
import {useEffect} from "react";
import {Helmet} from "react-helmet-async";
import {useRecoilState} from "recoil";
import {boardIdAtom, recordAtom} from "./boardDetailAtom";
import {Content} from "@/pages/BoardDetail";

export const BoardDetail = () => {
  const [boardId, setBoardId] = useRecoilState(boardIdAtom);
  const [record, setRecord] = useRecoilState(recordAtom);
  const location = window.location;

  const fetchTitle = () => {
    fetch(SERVER_URL + "api/boards/" + boardId)
      .then((response) => response.json())
      .then((data) => setRecord(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    console.log(location);
    console.log(location.pathname);
    const str = location.pathname;
    setBoardId(str.replace("/board/", ""));
    fetchTitle();
  }, [boardId]);

  return (
    <>
      <Helmet>
        <title>{record.title}</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="DJ-UP" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content={record.title} />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <Content record={record} />
      <Footer />
    </>
  );
};
