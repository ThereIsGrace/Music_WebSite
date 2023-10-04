import {Link} from "react-router-dom";
import {SubInfo} from "@/components";
import styled from "styled-components";
import palette from "@/assets/Styles/palette";

export function PostItem(props) {
  return (
    <PostItemBlock>
      <h2>
        {/* sb 컨트롤러 만들어서 연결하기 */}
        <Link to={`/board/${props.record.b_id}`}>{props.record.title}</Link>
      </h2>
      <SubInfo username={props.record.writer} publishedDate={new Date(props.record.updatedate)} />
      {/* <p>{props.record.content}</p> */}
    </PostItemBlock>
  );
}

const PostItemBlock = styled.div`
  padding-top: 1.5rem;
  padding-bottom: 1rem;
  /* 맨 위 포스트는 padding-top 없음 */
  &:first-child {
    padding-top: 0;
  }
  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h2 {
    font-size: 1.3rem;
    margin-bottom: 0;
    margin-top: 0;
    &:hover {
      color: ${palette.gray[6]};
    }
  }

  a {
    color: inherit;
  }

  p {
    margin-top: 2rem;
  }
`;
