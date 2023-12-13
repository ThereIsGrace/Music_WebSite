import { useEffect, useState } from "react";
import { CustomSlide } from './CustomSlide';
import styled from "styled-components";
import { SERVER_URL } from "@/constants";
import axios from "axios";
import { Heading2 } from "@/components";


export const GoodsSlide = () => {
    const [goodsList, setGoodsList] = useState([]);
    const getBestGoodsList = () => {
        axios.get(SERVER_URL + 'product/best')
        .then(res => setGoodsList(res.data))
        .catch();
    }

    useEffect(()=>{
        getBestGoodsList();
    }, [])
    return(
        <>
            <Container>
                <Heading2 className='banner'>인기상품</Heading2>
                <CustomSlide goodsList={goodsList}></CustomSlide>
            </Container>
        </>
    )
}

const Container = styled.div`
    overflow: hidden;
    padding-bottom: 40px;

    & .banner {
        font-style: normal;
        font-weight: 700;
        font-size: 40px;
        line-height: 54px;
        align-items: center;
        text-align: center;
        padding-top: 30px;
        padding-bottom: 20px;
    }

    & .font-semibold{
        font-weight: 600;
        font-size: 25px;
    }

    & .inline-flex{
        display: inline-flex;
    }

    & .relative {
        position: relative;
    }
`;