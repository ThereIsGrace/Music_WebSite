import {MainBanner, MainProduct, LineBanner, MainStore} from "@/pages/Home";
import {Helmet} from "react-helmet-async";
import {Header, Footer, StoreButton} from "@/components";

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
      <MainProduct />
      <LineBanner />
      <MainStore />
      <StoreButton />
      <Footer />
    </div>
  );
}
