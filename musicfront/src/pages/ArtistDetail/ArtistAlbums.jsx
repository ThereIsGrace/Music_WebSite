import styled from "styled-components";
import {ArtistAlbumItem, loadAlbumAtom, pageAtom2} from ".";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";

export const ArtistAlbums = ({data, selectedType, totalPage}) => {
  const [prevData, setPrevData] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [page2, setPage2] = useRecoilState(pageAtom2);
  const [, setLoadAlbum] = useRecoilState(loadAlbumAtom);
  const [isActive, setIsActive] = useState(false);

  const handleButton = () => {
    setPage2(page2 + 1);
    setLoadAlbum("on");
  };

  const loadData = async () => {
    const newData = data.list;
    if (newData.length !== 0 && newData !== prevData) {
      setPrevData(newData);
      setCurrentData((prev) => [...prev, ...newData]);
      console.log(currentData);
    }
  };

  useEffect(() => {
    loadData();
  }, [data]);

  useEffect(() => {
    if (selectedType === "앨범") {
      setIsActive(true);
    } else if (selectedType !== "앨범") {
      setIsActive(false);
    }
  }, [selectedType]);

  return (
    <StyledProduct>
      <div className={isActive ? "allAlbums active" : "allAlbums inactive"}>
        <div className="productContainer">
          {currentData.map((album) => (
            <ArtistAlbumItem key={album.id} data={album} />
          ))}
        </div>
        {totalPage <= page2 ? <></> : <button onClick={handleButton}>펼치기</button>}
      </div>
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
