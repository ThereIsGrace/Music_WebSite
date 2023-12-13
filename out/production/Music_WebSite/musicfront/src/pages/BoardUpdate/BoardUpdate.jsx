import { Footer, Header } from "@/components";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";
import { WriteSection } from "./WriteSection";
import { PlaceBox } from "./PlaceBox";




export function BoardUpdate(){
    return(
        <Wrap>
            <Helmet>
                <title>게시물 수정</title>
                <meta name="description" content="뮤직 커뮤니티 사이트" />
                <meta name="keywords" content="음악, 커뮤니티, 굿즈" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta property="og:site_name" content="MusicCat" />
                <meta property="og:locale" content="ko-KR" />
                <meta property="og:title" content="MusicCat 게시물 등록" />
                <meta property="og:url" content="" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="" />
                <meta property="og:description" content="뮤직 커뮤니티 사이트" />
            </Helmet>
            <Header />
            <WriteSection option={'update'} />
            <PlaceBox />
            <Footer />
        </Wrap>
    )
}

const Wrap = styled.div`
    margin: 120px auto 0 auto;
`;