import axios from "axios";
import { SERVER_URL } from "../constants";
import { getCookie, setCookie } from "@/utils/cookies";
import { getConfigFileParsingDiagnostics } from "typescript";
import { Navigate, useNavigate } from 'react-router-dom';

import { useState } from "react";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { authorizationAtom } from "@/pages/Login/loginAtom";
import { accessTokenState } from "./access";
import { Cookies } from "react-cookie";


const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    timeout: 1000,
    withCredentials: true
});
const config = '';
axiosInstance.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${accessTokenState.getAccessToken()}`;
  config.headers['Content-Type'] = 'application/json';
  if (config.method === 'get') {
    config.timeout = 12000;
}
  return config;
})


axiosInstance.interceptors.response.use(
    
    function (response) {
      // 200대 response를 받아 응답 데이터를 가공하는 작업
      const cookies = new Cookies();
      const Ilogin = cookies.get('ILOGIN');
      if (!Ilogin){
        console.log('로그인 상태 아님');
      }
      return response;
    },
    async function (error) {
      // console.error(error, '에러 발생');
      const {
        config,
        response: {status},
      } = error;
      
      const cookies = new Cookies();
      if (status === 403 || status === 401  || status === 400 || status === 500){  
        if (cookies.get("ILOGIN") === 'Y'){
          const originalRequest = config;
          await axios.get(SERVER_URL + 'silent-refresh').then(res => { 
            accessTokenState.setAccessToken(res.data.accessToken);
            axios.defaults.Authorization = `Bearer ${accessTokenState.getAccessToken()}`;
          }).catch(err => window.location.href = '/login');
          return axiosInstance(originalRequest);
        }else {
          window.location.href = '/login';
        }
      }else {
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;

