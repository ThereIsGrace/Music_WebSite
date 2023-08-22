import styled from "styled-components";
import {ArtistAlbumItem} from ".";
import {useEffect, useState} from "react";

export const ArtistAlbums = ({data, selectedType}) => {
  const [prevData, setPrevData] = useState([]);

  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <StyledProduct>
      <div className="productContainer">
        {data.list.map((album) => (
          <ArtistAlbumItem key={album.id} data={album} />
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
