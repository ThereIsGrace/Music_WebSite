import {UseSongList} from "@/components";
import styled from "styled-components";

export function PopularSongBody() {
  return (
    <StyledPopularProduct>
      <div className="PopularProductTitle">인기곡</div>
      <UseSongList mode={"popular"} />
    </StyledPopularProduct>
  );
}

const StyledPopularProduct = styled.div`
  margin: 140px auto;
  width: 1024px;

  & .PopularProductTitle {
    text-align: center;
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 54px;
  }

  & .productContainer {
    display: flex;
    margin-top: 85px;
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 55px;
    justify-items: center;
  }
`;
