import {Footer, Header} from "@/components";
import {SearchResultBody, TypesTab} from "@/pages/SearchResult";
import {useState} from "react";
import styled from "styled-components";

export function SearchResult() {
  const [selectedType, setSelectedType] = useState("전체");

  const handleSelectType = (classification) => {
    setSelectedType(classification);
  };

  return (
    <>
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

  & .storeList {
    width: 768px;
    margin: 10px auto 0;
    display: grid;
    grid-template-rows: repeat(5, 1fr);
    grid-template-columns: repeat(2, 1fr);
    column-gap: 32px;
    justify-items: center;
  }
`;
