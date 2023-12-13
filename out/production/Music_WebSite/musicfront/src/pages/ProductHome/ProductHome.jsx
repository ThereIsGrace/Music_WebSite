import {MainBanner, MainSong, LineBanner, MainStore} from "@/pages/Home";
import {Helmet} from "react-helmet-async";
import {Header, Footer, StoreButton} from "@/components";
import { ProductList } from "./ProductList";

export function ProductHome() {
  return (
    <div className="ProductHome">
      <Helmet>
        <title>상품 보기</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="MusicCat" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="MusicCat 상품" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
       <ProductList /> 
       <StoreButton attention={true}/>
      <Footer />
    </div>
  );
}
