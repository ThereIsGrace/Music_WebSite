import { SERVER_URL } from "@/constants"
import axios from "axios";
import { filterCriteriaAtom, filterPriceAtom, filterTypeAtom, pageNumAtom2, productListAtom, reloadCriteriaAtom, totalItemCountAtom } from "./productAtoms";
import { useRecoilState } from "recoil";
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { Product } from "./Product";
import styled from "styled-components";

import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { Filter } from "./Filter";
import { CustomPaging } from "@/components/CustomPaging/CustomPaging";
import { Paging } from "./Paging";

export function ProductList() {
    const [productList, setProductList] = useRecoilState(productListAtom);
    const [totalCount, setTotalCount] = useRecoilState(totalItemCountAtom);
    const [filterClicked, setFilterClicked] = useState(false);
    const [pageNum, setPageNum] = useRecoilState(pageNumAtom2);
    const [criteria, setCriteria] = useRecoilState(filterCriteriaAtom);
    const [hasType, setHasType] = useState(false);
    const typeName = window.location.pathname.replace('/','');
    const [reload, setReload] = useRecoilState(reloadCriteriaAtom);
    const [type, setType] = useRecoilState(filterTypeAtom);

    const location = useLocation();

    useEffect(() => {
        console.log(location);
        const type = location.pathname.replace('/','');
        let typeVal;
        if (type === 'stationery'){
            typeVal = '문구류'
            setType('문구류');
        }else if (type === 'album'){
            typeVal = '앨범'
            setType('앨범');
        }else if (type === 'garment'){
            typeVal = '의류'
            setType('의류');
        }else if (type === 'ticket'){
            typeVal = '콘서트 티켓'
            setType('콘서트 티켓');
        }else if (type === 'lightStick'){
            typeVal = '응원봉'
            setType('응원봉');
        }else if (type === 'photoCard'){
            typeVal = '포토카드'
            setType('포토카드');
        }else {
            setType('전체');
        }
        let priceVal;
        const data = {
            'type': typeVal, 
            'priceLevel': priceVal, 
            'criteria': criteria
        }

        console.log(data, 'product List data');
        const page = pageNum - 1;
        axios.post(SERVER_URL + `product/findFilter?page=${page}`, data)
        .then(res => {setProductList(res.data.content); console.log(res); setTotalCount(res.data.totalElements)})
        .catch();
    }, [ location, pageNum ])



    useEffect(() => {},[productList]);

    useEffect(()=> {
        setPageNum(1);
    },[]);

    return(
        <>
            <StyledProduct>
                <div className="Product">상품</div>
                <div className="filterName" onClick={() => setFilterClicked(!filterClicked)}>
                    <p className="filter">필터</p>               
                </div>
                {
                    filterClicked && <Filter setFilterClicked={setFilterClicked}></Filter>
                }
                <div className="productContainer">
                {productList.map((product, i) => (
                <Product key={i} product={product}></Product>
                ))}  
                </div>
            </StyledProduct>
            <Paging/>
        </>
    );

}

const StyledProduct = styled.div`
    margin: 140px auto;
    width: 1024px;
    position: relative;
    display: block;
    display: flex;
    flex-direction: column;

    & .filter {
        cursor: pointer;
    }

    & .Product {
        text-align: center;
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
    }

    & .filterName p{
        font-size: 15px;
        font-weight: 600;
        position: relative;
    }

    & .productContainer {
    display: flex;
    margin-top: 85px;
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    grid-template-columns: repeat(4, 1fr);
    gap: 55px;
    justify-items: center;
  }
`