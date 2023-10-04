import {PostImage, PostText, PlaceSearchBox} from "@/pages/Post";
import styled from "styled-components/macro";


export function PostSection() {
  return (
    <Section>
      <h1>상품 등록</h1>
      <PostImage />

      <PlaceSearchBox />
    </Section>
  );
}
const Section = styled.div`
  margin-bottom: 80px;

  & > h1 {
    font-size: 18px;
    color: #6c816d;
    font-weight: 600;
    border-bottom: 1px solid #dcdee3;
    padding-bottom: 16px;
    text-align: center;
  }
`;
