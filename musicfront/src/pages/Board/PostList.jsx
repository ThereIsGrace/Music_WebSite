import styled from "styled-components";
import {PostItem} from "@/pages/Board";
import {BoardBtn, Responsive} from "@/components";
import {useRecoilState} from "recoil";
import {boardAtom} from "./boardAtom";
import {Paging} from "./Paging";
import raccoon from "@/assets/Logo/raccoon.gif";

export function PostList() {
  const [board] = useRecoilState(boardAtom);

  const isLoggedIn = {};

  if (board.length === 0) {
    return (
      <StyledLoadingImgContainer role="alert">
        <img src={raccoon} alt="로딩 중..."></img>
      </StyledLoadingImgContainer>
    );
  }

  return (
    <PostListBlock>
      {board && board.map((record, index) => <PostItem record={record} id={record.b_id} key={index} />)}
      <Paging />
      <WritePostButtonWrapper>
        {isLoggedIn && (
          <BoardBtn blue to="/board/write">
            새 글<br />
            작성하기
          </BoardBtn>
        )}
      </WritePostButtonWrapper>
    </PostListBlock>
  );
}

const PostListBlock = styled(Responsive)`
  margin-top: 10em;
`;

const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;

const StyledLoadingImgContainer = styled.div`
  display: flex;
  margin-top: 40px;
  justify-content: center;

  & img {
    border-radius: 10%;
  }
`;
