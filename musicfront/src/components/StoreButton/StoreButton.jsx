import React, { useState } from "react";
import styled from "styled-components/macro";
import shop from "@/assets/shop.png";
import shopT from "@/assets/shopT.png";
import { Button } from "@/components/Button/Button";
import { useNavigate } from "react-router-dom";

export function StoreButton() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  function clickNavigate() {
    navigate("/shop");
  }

  function handleMouseEnter() {
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
  }

  return (
    <TopButton>
      <Button
        onClick={clickNavigate}
        className="TopBtn"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={shop} alt="굿즈샵" className="imgBtn"></img>
        {isHovered && <ShopText><img src={shopT} alt="Shop텍스트"/></ShopText>}
      </Button>
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