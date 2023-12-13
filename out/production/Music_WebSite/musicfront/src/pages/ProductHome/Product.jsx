import React, { useEffect } from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {Image} from "@/components";
import { productListAtom } from "./productAtoms";
import { useRecoilState } from "recoil";
import { FaStar } from "react-icons/fa6";

export function Product(props) {
  const product = props.product;

  return (
    <StyledProductContainer>  
      <Link to={`/productDetail/${product.goodsNo}`}>
        <Image className="interest" src={product.imageUrl} alt="상품 이미지"></Image>
      </Link>  
      <Link to={`/productDetail/${product.goodsNo}`}>
        <span className="title">{product.pname}</span>
      </Link>
      <div className='price-star'>
        <Link to={`/productDetail/${product.goodsNo}`}>
          <span className="price">{product.price}</span>
        </Link>
        <div className='star-count'>
          <FaStar size="10" className='yellowStar' style={{color: 'pink'}}/>
          <span>{product.count}</span>
          <span>({product.reviewNumber})</span>  
        </div>
      </div>


    </StyledProductContainer> 
  );
}

const StyledProductContainer = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 212px;
  height: 320px;

  & .star-count {
    display: flex;
    justify-content: start;
    align-items: center;
  }

  & img {
    border-radius: 12px;
    box-shadow: inset 0px 0px 0px 1px rgba(0, 0, 0, 0.15);
    display: block;
    width: 100%;
    height: 212px;
    object-fit: cover;
  }

  & a {
    margin: 0;
  }

  & .title {
    font-style: normal;
    margin-top: 12px;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    color: #212529;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  & .price-star{
    display: flex;
    justify-content: space-between;
  }
`;
