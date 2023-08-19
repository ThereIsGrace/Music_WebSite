import axios from "axios";
import { SERVER_URL } from "../constants";
import { getCookie, setCookie } from "@/utils/cookies";

const access_token = getCookie('accessToken');
const refresh_token = getCookie('refreshToken');

const axiosInstance = axios.create({
    baseURL: SERVER_URL,
    headers: {
        "content-type": "application/json;charset=UTF-8",
        accept: "application/json"
    },
    withCredentials: true
});

axiosInstance.interceptors.request.use(function(config) {
    console.log('request sent');
    config.headers.common["Authorization"] = access_token;
    config.headers.common["Refresh-Token"] = refresh_token;
    
    return config;
})

axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    async function (err) {
      if (err.response && err.response.data.status === "403 FORBIDDEN") {
        try {
          // 기존에 쿠키에 저장된 refresh token을 가져옴
          // refresh token만 가지고 access token 발급을 요청할 수 있도록 백엔드 팀원분들에게 요청 후 api를 설정함
          const refreshToken = await getCookie("refresh_token");
          axios.defaults.headers.common["refresh-token"] = refreshToken;
          // 토큰을 다시 발급 받는 api 호출 함수 
          refreshAccessToken();
        } catch (err) {
          console.log("error", err.response);
          window.location.href = "/";
        }
        return Promise.reject(err);
      }
      return Promise.reject(err);
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

