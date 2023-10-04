import {Header, Footer} from "@/components";
import {PostSection} from "@/pages/Post";
import {Helmet} from "react-helmet-async";
import styled from "styled-components/macro";

export function Post() {
  return (
    <Wrap>
      <Helmet>
        <title>상품등록</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="MusicCat" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="MusicCat 게시물 작성" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <PostSection />
      <Footer />
    </Wrap>
  );
}

const Wrap = styled.div`
  width: 1056px;
  margin: 120px auto 0 auto;
`;
