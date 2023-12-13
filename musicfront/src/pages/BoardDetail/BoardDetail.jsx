import {Footer, Header, SubInfo} from "@/components";
import {SERVER_URL} from "@/constants";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet-async";
import {useRecoilState, useRecoilValue} from "recoil";
import {boardIdAtom, recordAtom, replyListAtom} from "./boardDetailAtom";
import {Content} from "@/pages/BoardDetail";
import axios from "axios";
import axiosInstance from "@/axios_interceptor/axios_interceptor";

export const BoardDetail = () => {
  const [record, setRecord] = useState({});
  const [replyList, setReplyList] = useRecoilState(replyListAtom);
  const location = window.location;
  const str = location.pathname;
  const boardid = str.replace("/board/", "");
  const [boardId, setBoardId] = useState(boardid);
  const [big, setBig] = useState(0);
  useEffect(()=>{
    setReplyList([]);
  },[])
  const getDetail = () => {
    axios.get(SERVER_URL + "boardlist/detail/" + boardId)
    .then((response) =>  setRecord(response.data.data))
    .catch((error) => console.error(error));
  }

  useEffect(()=>{
    getReplyList();
  },[boardId]);

  const getReplyList = () => {
    axios.get(SERVER_URL + "boardlist/reply/" + boardId)
    .then((response) => setReplyList(response.data.data))
    .catch((error) => console.error(error));
  }

  useEffect(() => {
    getDetail();
  }, []);

  useEffect(() => {
  }, [record]);


  useEffect(() => {
    
  }, [big])

  return (
    <>
      <Helmet>
        <title>{record.title}</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="MusicCat" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content={record.title} /> 
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      {Object.keys(record).length !== 0 ? <Content record={record} getReplyList={getReplyList}/> : <></>}
      <Footer />
    </>
  );
};
