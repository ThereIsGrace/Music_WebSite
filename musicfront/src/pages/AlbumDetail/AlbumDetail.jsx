import {Footer, Header} from "@/components";
import {Helmet} from "react-helmet-async";
import {AlbumDetailBody} from "@/pages/AlbumDetail";
import {atom, useRecoilState} from "recoil";

export const albumNameAtom = atom({
  key: "albumName",
  default: "",
});

export const AlbumDetail = () => {
  const [albumName] = useRecoilState(albumNameAtom);

  return (
    <>
      <Helmet>
        <title>{albumName !== "" ? albumName + " - " : ""}DJ-UP!</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="DJ-UP" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="DJ-UP! 앨범 상세페이지" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <AlbumDetailBody />
      <Footer />
    </>
  );
};
