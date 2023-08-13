import styled from "styled-components";
import {PostItem} from "@/pages/Board";
import {BoardBtn, Responsive} from "@/components";
import {useRecoilState} from "recoil";
import {boardAtom} from "./boardAtom";

export function PostList() {
  const [board] = useRecoilState(boardAtom);

  const isLoggedIn = {};

  return (
    <PostListBlock>
      {board && board.map((record, index) => <PostItem record={record} id={record.b_id} key={index} />)}

      <WritePostButtonWrapper>
        {isLoggedIn && (
          <BoardBtn cyan to="/write">
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
