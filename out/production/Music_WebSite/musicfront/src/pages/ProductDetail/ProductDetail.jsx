import {Header, Footer} from "@/components"; // UpBotton
import {useParams} from "react-router-dom";
import {UseProductDetail} from "@/pages/ProductDetail";
import {Helmet} from "react-helmet-async";

export function ProductDetail() {
  const {id} = useParams();
  return (
    <div className="ProductDetail">
      <Helmet>
        <title>(곡이름-백요청으로 값을 받아 해결)</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="DJ-UP" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="DJ-UP! 곡 상세페이지" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <UseProductDetail id={id} />
      <Footer />
    </div>
  );
}
