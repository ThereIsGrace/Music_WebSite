import {Image} from "@/components";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { BiMinus } from "react-icons/bi";
import { Review } from "./Review";
import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";


import { Cookies } from "react-cookie";
import { LoginModal } from "@/components/Modal/LoginModal";
import { CountModal } from "@/components/Modal/CountModal";
import { CartModal } from "@/components/Modal/CartModal";
import StarRating from "./StarRating";

export function ProductDetailBody({product, user, reviewListEight, pname, reviewListMain, userThumbs, getReviewListMain, setReviewListMain}) {
  const price = product.price;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const [totalPiece, setTotalPiece] = useState(1);
  const [countModalOpen, setCountModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);

  useEffect(()=>{
    setTotalPrice(product.price);
  },[product.price]);

  const quantityUp = () => {
    if (quantity >= 10){
      setCountModalOpen(true);
      return;
    }
    setQuantity(quantity => quantity + 1);
    setTotalPrice(totalPrice => (quantity + 1)* product.price);
    setTotalPiece(totalPiece => totalPiece + 1);
  }

  useEffect(()=> {},[loginModalOpen]);
  useEffect(()=>{},[countModalOpen]);

  const quantityDown = () => {
    if (quantity <= 1){
      setCountModalOpen(true);
      return;
    }
    setQuantity(quantity => quantity - 1);
    setTotalPrice(totalPrice => (quantity - 1)* product.price);
    setTotalPiece(totalPiece => totalPiece - 1);
  }

  const addCart = () => {
    const cookies = new Cookies();
    if(!cookies.get('ILOGIN')){
      setLoginModalOpen(true);
      return;
    }
    
    
    const pathname = window.location.pathname;
    const goodsNo = pathname.replace('/productDetail/', '');

    const data = {
      user: user,
      goodsNo: goodsNo
    }
    console.log(data);
    console.log(quantity, 'quantity');
    axiosInstance.get(SERVER_URL + 'cart/add?goodsNo=' + goodsNo + '&quantity=' + quantity)
     .then(res => setCartModalOpen(true))
     .catch();
  }

  useEffect(()=>{},[cartModalOpen])
  


  return (
    <>
      <ProductInfo>
        <div className="productTop">
          <div className="productImage">
            <Image className="mainImg" src={product.imageUrl} alt="상품 이미지"></Image>
          </div>
          <div className="productSide rightSide">
            <h3 className="productName name">{product.pname}</h3>
            <p className="productPrice">{product.price} won</p>
            <p className="productSub">{product.description}</p>
            <StarRating count={product.count} reviewNumber={product.reviewNumber}/>
            { countModalOpen && <CountModal setModalOpen={setCountModalOpen}/>} 
            { cartModalOpen && <CartModal setModalOpen={setCartModalOpen}/>}
            <div className="divCenter">
              <button className="qtyButton1" onClick={quantityUp}><BsPlus></BsPlus></button>
              <input min="1" id="qty" name="qty" className="productQuantity" value={quantity}></input>
              <button className="qtyButton2" onClick={quantityDown}><BiMinus></BiMinus></button>
            </div>

            <div className="total">
              <div className="totalPrice">
                <span>Total Price</span>
                <span>{totalPrice}원</span>
              </div>
              <div className="totalPrice">
                <span>Total Item</span>
                <span>{totalPiece} 개</span>
              </div>
            </div>
            <div className="buttons">
              <button onClick={addCart}>add cart</button>
              <button onClick={addCart}>order</button>
            </div>
            {loginModalOpen && <LoginModal setModalOpen={setLoginModalOpen}/>}
          </div>
        </div>
        <div className="test">
      <div className="sub-image-url">
        <img src={product.subImageUrl}></img>
      </div>
    </div>
    <Review reviewListEight={reviewListEight} pname={pname} setReviewListMain={setReviewListMain} reviewListMain={reviewListMain} userThumbs={userThumbs} getReviewListMain={getReviewListMain}></Review> 
    </ProductInfo>
    </>


  );
}

const ProductInfo = styled.div`
  & * {
    box-sizing: border-box;
  }

  max-width: 1096px;
  width: 100%;
  height: 100%;
  margin: 0px auto;
  padding: 160px 50px 60px;

  & .mainImg {
    width: 400px;
    height: 400px;
    border-radius: 8px;
    object-fit: cover;
  }

  & .text {
    display: flex;
    justify-content: center;
  }

  & .test img {
    max-width: 100%;
    max-height: 100%;
  }

  & .myT img{
    width: 100%;
  }

  & .divCenter {
    display: flex;
    align-items: center;
  }

  & .qtyButton1 {
    width: 30px;
    height: 30px;
    border-top-left-radius: 2px;
    border-bottom-left-radius: 2px;
    border: 1px solid rgb(85, 85, 85);
  }

  & .qtyButton2 {
    width: 30px;
    height: 30px;
    border-top-right-radius: 2px;
    border-bottom-right-radius: 2px;
    border: 1px solid rgb(85, 85, 85);
  }

  & .sub-image-url{
    margin: auto;
    display: flex;
    justify-content: center;
    margin-bottom: 100px;

    & img {
      width: 1056px;
    }
  }





  & .productTop {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  & .productImage {
    object-fit: cover;
    aspect-ratio: 1 / 1;
  }

  & .rightSide {
    color: rgb(34, 34, 34);
  }

  & .productName {
    font-size: 2.5rem;
    font-weight: 700;
  }

  & .productPrice {
    margin: 20px 0px 40px;
    font-size: 18px;
    font-weight: bold;
  }

  & .productSub {
    color: rgb(85, 85, 85);
  }

  & .productQuantity {
    width: 40px;
    margin: 30px 0px;
    height: 30px;
    color: rgb(85, 85, 85);
  }

  & input[type="number" i]{
    writing-mode: horizontal-tb !important;
    padding-block: 1px;

    padding-inline: 2px;
  }

  & .total {
    padding-top: 30px;
    border-top: 1px solid rgb(196, 196, 196);
  }

  & .totalPrice {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    margin-bottom: 15px;
    color: rgb(85, 85, 85);
  }

  & .buttons {
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 50px;
    text-transform: uppercase;
  }

  & .buttons button {
    all: unset;
    text-align: center;
    cursor: pointer;
    color: rgb(255, 255, 255);
    background-color: rgb(85, 85, 85);
    padding: 12px 30px;
    border-radius: 10px;

  }
`;
