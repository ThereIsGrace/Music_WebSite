import { Col, Form, InputGroup, Row } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { descriptionAtom, pnameAtom, priceAtom, quantityAtom } from "./postAtoms";
import styled from "styled-components";

export function PostText(){
    const [pname, setPname] = useRecoilState(pnameAtom);
    const [price, setPrice] = useRecoilState(priceAtom);
    const [quantity, setQuantity] = useRecoilState(quantityAtom);
    const [description, setDescription] = useRecoilState(descriptionAtom);

    const onChangePname = (e) => {
        setPname(e.target.value);
    }

    const onChangePrice = (e) => {
        setPrice(e.target.value);
    }

    const onChangeQuantity = (e) => {
        setQuantity(e.target.value);
    }

    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    }

    return(
        <>
            <Container>
                <div className="name-section">
                    <div className="goods-section goods-name">
                        <h2 className="head-title">상품명</h2>
                        <input type="text" placeholder="상품명을 입력해주세요" onChange={onChangePname}></input>
                    </div>
                    <div className="goods-section goods-description">
                        <h2 className="head-title">상품설명</h2>
                        <input type="text" placeholder="상품설명을 입력해주세요" onChange={onChangeDescription}></input>
                    </div>
                </div>

                <div className="price-quantity-section">
                    <div className="goods-section price">
                        <h2 className="head-title">가격</h2>
                        <div className="price-section">
                            <input type="text" placeholder="가격을 입력해주세요" className="price" onChange={onChangePrice}></input>
                            <span>원</span>
                        </div>

                    </div>
                    <div className="goods-section quantity">
                        <h2 className="head-title">수량</h2>
                        <div className="quantity-section">
                            <input type="text" placeholder="수량을 입력해주세요" className="quantity" onChange={onChangeQuantity}></input>
                            <span>개</span>
                        </div>
                    </div>
                </div>

            </Container>
        </>

    )
}

const Container  = styled.div`
    & input {
        border: none;
        border-bottom: 1px solid black;
        width: 500px;

        &:focus {
            outline: none;
        }
    }

    & .head-title {
        font-size: 22px;
        font-weight: 500;
        margin-bottom: 15px;
    }

    & .goods-section {
        margin: 10px;
    }

    & .price {
        width: 300px;
    }

    & .quantity {
        width: 250px;
    }

    & .name-section {
        display: flex;
        margin-top: 30px;
    }

    & .price-section {
        display: flex;
    }

    & .quantity-section {
        display: flex;
    }

    & .price-quantity-section {
        display: flex;
        margin-top: 30px;
        gap: 25px;
    }
`