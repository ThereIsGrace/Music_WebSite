import {Link} from "react-router-dom";
import {SubInfo} from "@/components";
import styled from "styled-components";
import palette from "@/assets/Styles/palette";

export function PostItem(props) {
  return (
    <PostItemBlock>
      <h2>
        <Link to={`/board/${props.record.b_id}`}>{props.record.title} [{props.record.replyList.length}]</Link>
        <SubInfo username={props.record.user.username} publishedDate={props.record.updatedate}></SubInfo>
      </h2>
    </PostItemBlock>
  );
}

const PostItemBlock = styled.div`
  padding-top: 1.3rem;
  padding-bottom: 0.9rem;

  &{
    border-bottom: 1px solid ${palette.gray[2]};
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

