import {SidebarTop, Section} from "@/pages/Mypage/";
import {Header, Footer} from "@/components";
import {Helmet} from "react-helmet-async";
import styled from "styled-components/macro";
import axios from "axios";
import { useEffect } from "react";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { getCookie, setCookie } from "@/utils/cookies";

const access_token = getCookie('accessToken');
const refresh_token = getCookie('refreshToken');


const myPage = async () => {

  axiosInstance.get("/mypage")
  .then((response) => {
    console.log(response);
    // return response;
  })
  .then((data) => {
    console.log(data);
    console.log("정보를 잘 받아옴");
  })
  .catch((error) => {
    console.error("instance error: ", error);
  });

  try {
  /* axiosInstance.get('/mypage')
    .then((response) => {
      console.log(response);
      return response;
    }).then((data) => {
      console.log(data);
    }).catch((error) => {
      console.log(error);
    });*/ 
/*
    axios.interceptors.request.use(
      (config) => {
        // getToken() - 클라이언트에 저장되어 있는 액세스 토큰을 가져오는 함수      
        console.log('request sent');
        console.log(config);

        //       console.log(JSON.stringify(config));


        config.headers["Authorization"] = access_token;
        config.headers["refreshToken"] = refresh_token;

        

        return config;
      },
      (error) => {
        console.log(error);
        return Promise.reject(error);
      }
    );
    axios.get('/mypage')
      .then((response) => {

      let jwtToken = response.headers.get("Authorization");
      let jwtToken2 = response.headers.get("refreshToken");
//      localStorage.setItem("Authorization", jwtToken);
//      localStorage.setItem("refreshToken", jwtToken2);

    }).catch((error) => {
      console.log(error);
    });
    
*/

    console.log("정보를 잘 받아옴");
  } catch (error) {
    console.error(error.message);
  }

};



export function Mypage() {
  useEffect(()=>{
    myPage();
  },[])
  return (
    <Wrap>
      <Helmet>
        <title>사자 - 마이페이지</title>
        <meta name="description" content="사자마켓-중고 거래 장터 whit.프론트엔도" />
        <meta name="keywords" content="중고거래, 당근마켓, 멋쟁이사자처럼, 멋쟁이사자처럼프론트엔드" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="사자마켓" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="사자마켓 마이페이지" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="사자마켓-중고 거래 장터 whit.프론트엔도" />
      </Helmet>
      <Header></Header>
      <div>
        <SidebarTop></SidebarTop>
        <Section></Section>
      </div>
      <Footer></Footer>
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 1056px;
  margin: 120px auto 0 auto;

  & > div {
    display: flex;
    margin-bottom: 80px;
  }

  & .ListTitle {
    height: 60px;
    background-color: #f8e1db;
    color: #6c816d;
    font-weight: 500;
  }

  & .ListTitle span {
    margin-left: 24px;
    line-height: 60px;
  }
`;
