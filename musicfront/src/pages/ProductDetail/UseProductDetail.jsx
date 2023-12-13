import React from "react";
import {useProducts} from "@/components";
import {ProductDetailBody} from "@/pages/ProductDetail/ProductDetailBody";
import styled from "styled-components";

export function UseProductDetail({product, user, reviewListEight,pname, setReviewList, reviewListMain, userThumbs, getReviewListMain, setReviewListMain}) {
  // const { product } = props;
  //const { user } = props.user;
  return (
    <Container>
      <div className="imgContainer">
        <ProductDetailBody product={product} user={user} reviewListEight={reviewListEight} setReviewListMain={setReviewListMain} reviewListMain={reviewListMain} setReviewList={setReviewList} pname={pname} userThumbs={userThumbs} getReviewListMain={getReviewListMain}/>
      </div>
    </Container>
  );
}

const Container = styled.div`
`
