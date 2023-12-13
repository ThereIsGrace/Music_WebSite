import {SidebarTop, Section} from "@/pages/Mypage/";
import {Header, Footer} from "@/components";
import {Helmet} from "react-helmet-async";
import styled from "styled-components/macro";
import axios from "axios";
import { useEffect, useState } from "react";

import { SERVER_URL } from "@/constants";
import { createGlobalStyle } from 'styled-components';
import { Cookies } from "react-cookie";
import { authorizationAtom, loggedInAtom } from "../Login/loginAtom";
import { useRecoilValue } from "recoil";
import axiosInstance from "@/axios_interceptor/axios_interceptor";


const cookies = new Cookies();

export const getCookie = (name) => {
  return cookies.get(name); 
 }

export function Mypage() {
  const [user, setUser] = useState([]);
  const [auth] = useRecoilValue(authorizationAtom);
  const loggedIn = useRecoilValue(loggedInAtom);
  const [boardList, setBoardList] = useState([]);
  
  const userBoard = () => {
    axiosInstance.get(SERVER_URL + 'my/boardlist')
    .then(res => setBoardList(res.data.data.content))
    .catch(err => console.log(err));
  }



  useEffect(()=>{
    userBoard();
  },[]);

  useEffect(()=>{
    
  },[boardList])

  
  useEffect(() => {
    axiosInstance.get(SERVER_URL + 'user/myPage')
    .then(res => {console.log(res); setUser(res.data.data);})
    .catch(error => {console.error(error); console.log('error', 'error가 발생')})}, []);


  return (
    <Wrap>
      <Helmet>
        <title>MusicCat - 마이페이지</title>
        <meta name="description" content="MusicCat 마이페이지" />
        <meta name="keywords" content="음악, 커뮤니티, 굿즈" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="MusicCat" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="MusicCat 마이페이지" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="MusicCat 마이페이지" />
      </Helmet>
      <Header></Header>
      <div>
        <SidebarTop user={user}></SidebarTop>
        <Section user={user} boardList={boardList}></Section>
      </div>
      <Footer></Footer>
    </Wrap>
  );
}

const Wrap = styled.div`
  margin-top: 120px;
  

  & > div {
    display: flex;
    width: 1056px;
    margin-bottom: 80px;
    margin: 0 auto;
  }

  & .ListTitle {
    height: 60px;
    background-color: #f8e1db;
    color: rgb(85, 85, 85);
    font-weight: 500;
  }

  & .ListTitle span {
    margin-left: 24px;
    line-height: 60px;
  }
`;
