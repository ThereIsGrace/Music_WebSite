import React, { useEffect, useState } from "react";
import styled from "styled-components/macro";
import shop from "@/assets/shop.png";
import shopT from "@/assets/shopT.png";
import { Button } from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";
import { Image } from "..";
import timer from "@/assets/Logo/timer.png";
import { StoreButtonDetail } from "./StoreButtonDetail";


export function StoreButton({attention}) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [size, setSize] = useState(0);
  const [productImg, setProductImg] = useState(timer);
  const [original, setOriginal] = useState(true);
  const [visible, setVisible] = useState(false);
  const [atList, setAtList] = useState([]);
  useEffect(() => {
    getLocalStorage();
  },[size, attention]);

  const getLocalStorage = () => {
    if (attention){
      const attentionList = JSON.parse(localStorage.getItem('atlist'));
      if (attentionList){
        const reversedAttentionList = attentionList.reverse();
        if (reversedAttentionList){
          setAtList(reversedAttentionList);
          const productImage = reversedAttentionList[0].imageUrl;
          setProductImg(productImage);
          setSize(reversedAttentionList.length);
        }else {
        }
      }

    }
  }




  return (
      <TopButton>
        {
          original &&
          <Context onClick={() => {setOriginal(false); setVisible(true)}}>
            <Image src={productImg}></Image>
            <div className='number'>{size}</div>
          </Context>
        }
        {
          visible && <StoreButtonDetail visible={visible} setVisible={setVisible} setOriginal={setOriginal} atList={atList}/>
        }
      </TopButton>
  );
}

const TopButton = styled.div`
  position: fixed;
  text-align: center;
  right: 5%;
  bottom: 5%;
  z-index: 1;


  & .TopBtn {
    cursor: pointer;
    padding: 0;
    border: 0;
    background: 0;
  }

  & .imgBtn {
    &:hover {
      opacity: 0%;
    }
  }
`;

const Context = styled.div`
  position: relative;

  & img {
    cursor: pointer;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  & .number {
    cursor: pointer;
    position: absolute;
    top: -3px;
    right: -3px;
    background-color: #5055b1;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
  }
`

const ShopText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: black;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 30px;
  white-space: nowrap;
  z-index: -1;
`;