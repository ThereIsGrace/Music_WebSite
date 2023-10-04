import palette from "@/assets/Styles/palette";
import {Responsive, SubInfo} from "@/components";
import React from "react";
import styled from "styled-components";

export const Content = (props) => {
  const {title, content, writer, regidate} = props.record;
  return (
    <>
      <PostViewerBlock>
        <PostHead>
          <h1>{title}</h1>
          <SubInfo username={writer} publishedDate={regidate} hasMarginTop />
        </PostHead>
        <PostContent dangerouslySetInnerHTML={{__html: content}} />
      </PostViewerBlock>
    </>
  );
};

const PostViewerBlock = styled(Responsive)`
  margin-top: 10rem;
`;
const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
  min-height: 500px;
  word-wrap: break-word;
`;
