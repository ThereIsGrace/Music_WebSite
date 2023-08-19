import {MainBanner, MainSong, LineBanner, MainStore} from "@/pages/Home";
import {Helmet} from "react-helmet-async";
import {Header, Footer, StoreButton} from "@/components";
import axios from "axios";
import { SERVER_URL } from "@/constants";


const TOKEN = localStorage.getItem("Authorization");

const instance = axios.create({
  // 상대적인 URL을 인스턴스 메서드에 전달하려면 baseURL을 설정하는 것은 편리하다.
  // URL(서버 주소) 예시 - http://127.0.0.1:5500/
  baseURL: SERVER_URL,
  // 요청이 timeout보다 오래 걸리면 요청이 중단된다.
  timeout: 1000,
});

instance.interceptors.request.use(
  (config) => {
    // getToken() - 클라이언트에 저장되어 있는 액세스 토큰을 가져오는 함수

    config.headers["Authorization"] = localStorage.getItem("Authorization");
    config.headers["Reflash"] = localStorage.getItem("Reflash");

    console.log("성공");
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

export default instance;

export function Home() {
  return (
    <div className="Home">
      <Helmet>
        <title>DJ-UP! 메인페이지</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="DJ-UP" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="DJ-UP! 메인페이지" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <MainBanner />
      <MainSong />
      <LineBanner />
      <MainStore />
      <StoreButton />
      <Footer />
    </div>
  );
}
