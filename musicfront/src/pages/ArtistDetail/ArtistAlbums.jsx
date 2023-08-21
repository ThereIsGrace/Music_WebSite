import styled from "styled-components";
import {ArtistAlbumItem} from ".";
import {useEffect} from "react";

export const ArtistAlbums = (props) => {
  useEffect(() => {
    console.log(props.data);
  }, []);

  return (
    <StyledProduct>
      <div className="productContainer">
        {props.data.list.map((album) => (
          <ArtistAlbumItem data={album} />
        ))}
      </div>
      <div></div>
    </StyledProduct>
  );
};

const StyledProduct = styled.div`
  & .inner {
    margin: 65px auto 85px;
    width: 1056px;
  }

  & h2 {
    font-style: normal;
    font-weight: 700;
    font-size: 40px;
    line-height: 54px;
    align-items: center;
    text-align: center;
    color: #212529;
  }

  & .productContainer {
    margin: 85px auto 0px auto;
    display: default;
    width: 1000px;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
  }

  & .recent {
    margin-top: 55px;
    display: block;
    text-align: center;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    letter-spacing: -0.3px;
    text-decoration-line: underline;
    color: #212529;
  }
`;
