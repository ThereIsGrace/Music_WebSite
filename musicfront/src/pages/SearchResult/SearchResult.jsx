import {Footer, Header} from "@/components";
import {SearchResultBody, TypesTab} from "@/pages/SearchResult";
import {useState} from "react";
import styled from "styled-components";
import {Helmet} from "react-helmet-async";

export function SearchResult() {
  const [selectedType, setSelectedType] = useState("전체");

  const handleSelectType = (type) => {
    setSelectedType(type);
  };

  return (
    <>
      <Helmet>
        <title>DJ-UP! - 검색 페이지</title>
        <meta name="description" content="뮤직 커뮤니티 사이트" />
        <meta name="keywords" content="음악, 커뮤니티, DJ, TURN THE TABLE" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="DJ-UP" />
        <meta property="og:locale" content="ko-KR" />
        <meta property="og:title" content="DJ-UP! 검색 페이지" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="" />
        <meta property="og:description" content="뮤직 커뮤니티 사이트" />
      </Helmet>
      <Header />
      <StyledStore>
        <TypesTab onSelectType={handleSelectType} />
        <SearchResultBody selectedType={selectedType} />
      </StyledStore>
      <Footer />
    </>
  );
}

const StyledStore = styled.div`
  margin-bottom: 80px;
  margin-top: 100px;

  & .inner {
    margin: 65px auto 85px;
    width: 1056px;
  }

  & h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 32px;
    line-height: 48px;
    text-align: center;
    color: #212124;
  }

  & .list {
    width: 768px;
    margin: 10px auto 0;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(2, 1fr);
    column-gap: 32px;
    justify-items: center;
  }

  & .elem {
    margin-bottom: 50px;
  }

  & a {
    color: black;
  }
`;
