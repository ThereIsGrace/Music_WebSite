import styled from 'styled-components';
import { PostItem } from '@/pages/Board';
import { BoardBtn, Responsive } from '@/components';

export function PostList (props) {
    const isLoggedIn={};

    const board = props.board;

    return (
      <PostListBlock>
        <WritePostButtonWrapper>
          { isLoggedIn && (
            <BoardBtn cyan to="/write">
              새 글<br/>작성하기
            </BoardBtn>
          )}
        </WritePostButtonWrapper>
        {/*  로딩 중 아니고, 포스트 배열이 존재할 때만 보여줌 */}
        {board && 
          board.map(record => (
            <PostItem record={record} key={record.id} />
          ))
        }
    </PostListBlock>
    )
}



const PostListBlock = styled(Responsive)`
  margin-top: 3em;
  
`;


const WritePostButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 3rem;
`;