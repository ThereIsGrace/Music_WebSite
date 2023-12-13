import styled from "styled-components";
import { accessTokenState } from './../../axios_interceptor/access';
import { TiDelete } from "react-icons/ti";
import { TiDeleteOutline } from "react-icons/ti";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { SERVER_URL } from "@/constants";
import { filterCriteriaAtom, filterHasTypeAtom, filterPriceAtom, filterTypeAtom, productListAtom, totalItemCountAtom } from "./productAtoms";

export const Filter = ({setFilterClicked}) => {
    const largeCategory = ['앨범', '포토카드', '응원봉', '콘서트 티켓', '의류', '문구류', '전체'];
    const priceCategory = ['10,000원 미만', '10,000원 이상 30,000원 미만', '30,000원 이상 50,000원 미만', '50,000원 이상 100,000원 미만', '전체'];
    const standardCategory = ['판매순', '신상품순'];
    const [type, setType] = useRecoilState(filterTypeAtom);
    const [price, setPrice] = useRecoilState(filterPriceAtom);
    const [criteria, setCriteria] = useRecoilState(filterCriteriaAtom);
    const [productList, setProductList] = useRecoilState(productListAtom);
    const [totalCount, setTotalCount] = useRecoilState(totalItemCountAtom);
    const hasType = useRecoilValue(filterHasTypeAtom);



    const reset = () => {
        setType('전체');
        setPrice('전체');
        setCriteria('신상품순');
    }

    const changeType = (e) => {
        setType(e.target.value);
    } 

    const changePrice = (e) => {
        setPrice(e.target.value);
    }

    const changeCriteria = (e) => {
        setCriteria(e.target.value);
    }

    useEffect(()=> {
        apply();
    },[type, price, criteria]);


    const apply = () => {
        let typeVal;
        if (type === '전체'){

        }else {
            typeVal = type;
        }

        let priceVal;
        if (price === '10,000원 미만'){
            priceVal = '1,9999'
        }else if (price === '10,000원 이상 30,000원 미만'){
            priceVal = '10000,29999'
        }else if (price === '30,000원 이상 50,000원 미만'){
            priceVal = '30000,49999'
        }else if (price === '50,000원 이상 100,000원 미만'){
            priceVal = '50000,99999'
        }else if (price === '전체'){

        }


        const data = {
            'type': typeVal,
            'priceLevel': priceVal, 
            'criteria': criteria
        }

        console.log(data);

        axios.post(SERVER_URL + 'product/findFilter', data)
        .then(res => {setProductList(res.data.content); console.log(res); setTotalCount(res.data.totalElements)})
        .catch();
    }


    const makeFunc = (title, customArray, changeFunc, checkValue) => {
        return (

                <div className="category">
                    <div className="category-name">
                        {title}
                    </div>
                    <ul className="category-content">
                        <fieldset>
                        {customArray.map((category) => {
                            return <li><input
                            type="radio"
                            value={category}
                            name={title}
                            checked={category === checkValue}
                            onChange={changeFunc}
                          />{category}</li>
                        })}
                        </fieldset>
                    </ul>
                </div>
        )
    }
    return(
        <>
            <Container>
                <TiDelete className="ti-delete" onClick={() => setFilterClicked(false)}></TiDelete>
                <div className='category-box'>    
                    {
                        makeFunc('type', largeCategory, changeType, type)
                    }
                    {
                        makeFunc('price', priceCategory, changePrice, price)
                    }
                    {
                        makeFunc('criteria', standardCategory, changeCriteria, criteria)
                    }
                   
                </div>
                <div className="button-group">
                    <button className="reset" onClick={reset}>초기화</button>
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    margin-top: 50px;
    overflow: hidden;
    width: 100%;
    background-color: white;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.15);
    padding: 10px;

    & .active {
        height: 400px;
    }

    & .button-group {
        display: flex;
        justify-content: flex-end;
        gap: 2px;
        padding-right: 15px;
    }
    & .apply {
        display: inline-block;
        height: 30px;
        font-size: 14px;
        border: none;
        background-color: red;
        color: white;
        border-radius: 15%;
    }

    & .reset {
        display: inline-block;
        height: 30px;
        font-size: 14px;
        border: none;
        background-color: gray;
        color: white;
        border-radius: 15%;
    }

    & .category-box {
        display: flex;
        justify-content: space-evenly;
    }
    & .category {
        display: flex;
        flex-direction: column;
    }

    & .category-name {
        text-align: left;
        font-weight: 700;
        font-size: 18px;
        margin-bottom: 7px;
    }

    & .category-content li{
        margin-bottom: 10px;
    }

    & .choice {
        display: flex;
        flex-direction: column;
    }

    & .ti-delete {
        cursor: pointer;
    }

    & .ti-delete svg {
        width: 100px;
    }

`;