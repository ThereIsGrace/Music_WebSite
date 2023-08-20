import axios from "axios";
import { SERVER_URL } from "../constants";
import { getCookie, setCookie } from "@/utils/cookies";

const access_token = getCookie('accessToken');
const refresh_token = getCookie('refreshToken');

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
      "Accept": "application/json, text/plain, */*",    
      // 추가  
      "Access-Control-Allow-Origin": `http://localhost:3000`,
      'Access-Control-Allow-Credentials':"true",
  },
  withCredentials: true,

});
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(function(config) {
    console.log('request sent');

    console.log(config);

    config.headers["Authorization"] = access_token;
    config.headers["refreshToken"] = refresh_token;

//    config.headers["Authorization"] = localStorage.getItem("Authorization");
//    config.headers["refreshToken"] = localStorage.getItem("refreshToken");

    return config;
})

axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
  
  const refreshAccessToken = async () => {
    const response = await axios.post("http://localhost:8094/reissue");
      // response를 받고 header부분에 token을 받아서 쿠키에 담기 
    const access_token = response.headers["authorization"];
    setCookie("access_token", access_token); 
      // 화면에 바로 반영이 안돼서 강제적으로 reload 시킴 
    window.location.reload();
  };


export default axiosInstance;

