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
            <PlaceBox />
        </Section>
    )
}

const Section = styled.div`
    margin-bottom: 80px;
    width: 1056px;
    margin: 0 auto;


    & > h1 {
        font-size: 25px;
        color: rgb(85, 85, 85);
        font-weight: 600;
        border-bottom: 1px solid #dcdee3;
        padding-bottom: 16px;
        text-align: center;
    }
`;