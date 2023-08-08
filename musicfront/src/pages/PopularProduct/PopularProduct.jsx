import {Header, Footer} from "@/components"; // UpButton
import {PopularProductBody} from "./PopularProductBody";
import {Helmet} from "react-helmet-async";

export function PopularProduct() {
  return (
    <div>
      <Helmet>
        <title>DJ-UP! 인기곡</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="DJ-UP" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="DJ-UP! 인기곡" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <PopularProductBody />
      <Footer />
    </div>
  );
}
