import React from "react";
import {useProducts} from "@/components";
import {ProductDetailBody} from "@/pages/ProductDetail/ProductDetailBody";

export function UseProductDetail(props) {
  const {isLoading, productsState} = useProducts();
  if (isLoading) {
    return <div role="alert">로딩 중...</div>;
  }
  const product = productsState.find((p) => p.id === props.goodsNo);
  
  return (
    <div>
      <div className="imgContainer">
        <ProductDetailBody prod={product} />
      </div>
    </div>
  );
}
