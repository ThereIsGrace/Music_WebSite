import styled from "styled-components/macro";
import { PostImage } from "./PostImage";
import { PostText } from "./PostText";
import { PlaceBox, SubText } from ".";



export function RegGoodsSection(){
    return(
        <Section>
            <h1>상품 등록</h1>
            <PostImage />
            <PostText />
            <SubText />
            <PlaceBox />
        </Section>
    )
}

const Section = styled.div`
    margin-bottom: 80px;


    & > h1 {
        font-size: 18px;
        color: #2980b9;
        font-weight: 600;
        border-bottom: 1px solid #dcdee3;
        padding-bottom: 16px;
        text-align: center;
    }
`;