import {SectionProfileInfo, MannerTemperature, SectionInfoCount, Compliment, MypageReview} from "@/pages/Mypage/";
import styled from "styled-components/macro";

export function Section(props) {
  const user = props.user;
  const boardList = props.boardList;
  return (
    <MypageSection>
      <h1>프로필</h1>
      <SectionProfileInfo user={user}></SectionProfileInfo>
      <SectionInfoCount></SectionInfoCount>
      <div className="SectionItemReview">
        <Compliment boardList={boardList}></Compliment>
        <MypageReview></MypageReview>
      </div>
    </MypageSection>
  );
}

const MypageSection = styled.div`
  width: 816px;
  margin-left: 24px;

  & > h1 {
    font-size: 18px;
    color: rgb(85, 85, 85);
    font-weight: 600;
    border-bottom: 1px solid #dcdee3;
    padding-bottom: 16px;
    text-align: center;
  }

  & .SectionItemReview {
    display: flex;
  }
`;
