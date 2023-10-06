import {Image} from "@/components";
import styled from "styled-components";
import {Link} from "react-router-dom";
import {UseProductList} from "@/components";



export function ProductDetailBody(props) {
  document.getElementsByClassName('descriptionDescription').innerHTML = "홍길동";
  

  return (
    <StyledProductDetail>
      <section className="productImg">
        <Link to="/">
          <Image className="mainImg" src={props.prod.imageUrl} alt="상품 이미지"></Image>
        </Link>
      </section>
      <section className="userInfo">
        <div className="userInfoContainer">
          <div className="userInfoImgContainer">
          </div>
          <div className="spanContainer">
            <span className="userId">{props.prod.pname}</span>
            <span className="userLocation">{props.prod.location}</span>
          </div>
        </div>
      </section>
      <hr />
      <section className="productDescription">
        <span className="titleDescription">{props.prod.title} </span>
        <span className="priceDescription">{props.prod.price}원 </span>

      </section>
      <hr />
      <section className="a"> 
        <span className="descriptionDescription">
          <div dangerouslySetInnerHTML={{ __html: props.prod.content }} ></div>
        </span>
      </section>

      <section className="popularProduct">
        <div className="textContainer">
          <span>인기상품</span>
          <Link to="/PopularProduct">더 구경하기</Link>
          
        </div>
        <UseProductList count={6} excludeId={props.prod.id} />
      </section>
    </StyledProductDetail>

  );
}

const StyledProductDetail = styled.div`
  & hr {
    width: 678px;
    border: 1px solid #eaebee;
  }

  & .productContainer {
    display: grid;
    grid-template-rows: repeat(2, 1fr);
    grid-template-columns: repeat(3, 1fr);
    gap: 14px;
    justify-items: center;
    margin-right: 0;
  }

  & .productImg {
    margin: 64px auto 0 auto;
    width: 678px;
    height: 564px;
  }

  & .userInfoContainer {
    display: flex;
    width: 678px;
    height: 60px;
    margin: 24px auto;
    align-items: center;
  }

  & .userInfoImgContainer {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    overflow: hidden;
    margin-right: 8px;
  }

  & .userImg {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & .a {
    text-align: center;
  }
  & .spanContainer {
    line-height: 20px;
  }

  & .spanContainer span {
    display: block;
  }

  & .userId {
    font-style: normal;
    font-weight: 600;
    font-size: 15px;
    color: #212529;
  }

  & .userLocation {
    font-style: normal;
    font-weight: 400;
    font-size: 13px;
    color: #212529;
  }

  & .productDescription {
    width: 678px;
    height: 84px;
    margin: 36px auto;
  }

  & .mainImg {
    width: 678px;
    height: 564px;
    margin-bottom: 25px;
    border-radius: 8px;
  }

  & .titleDescription {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }

  & .priceDescription {
    display: block;
    font-style: normal;
    color: #212529;
    font-weight: 700;
    font-size: 15px;
    line-height: 30px;
  }

  & .descriptionDescription {
    font-style: normal;
    font-weight: 400;
    font-size: 17px;
    line-height: 30px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  & .interestDescription {
    display: block;
    font-style: normal;
    margin-top: 3px;
    font-size: 12px;
    line-height: 3 px;
    color: #868e96;
  }

  & .popularProduct {
    width: 678px;
    height: 100%;
    margin: 0 auto;
  }

  & .textContainer {
    display: flex;
    width: 678px;
    margin: 0 auto;
    justify-content: space-between;
  }

  & .textContainer span,
  a {
    margin: 36px 0 0 0;
  }

  & .textContainer span {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 26px;
  }

  & .textContainer a {
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 21px;
    color: #ff8a3d;
  }

  & a:hover {
    font-weight: 600;
  }

`;
