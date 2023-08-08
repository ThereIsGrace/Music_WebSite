import {Input} from "@/components/Input/Input";
import styled from "styled-components/macro";
import {useRecoilState} from "recoil";
import { postTitleAtom, postContentAtom} from "./postAtoms";

export function PostText() {
  const [postTitle, setPostTitle] = useRecoilState(postTitleAtom);
  const [postContent, setPostContent] = useRecoilState(postContentAtom);

  function onTextareaChange(e) {
    const content = e.target.value;
    setPostContent(content);
  }

  function onTitleChange(e) {
    const title = e.target.value;
    setPostTitle(title);
  }

  return (
    <TextBox>
      <div className="TextTitleInput">
        <Input value={postTitle} placeholder="글 제목" className="TextTitle" onChange={onTitleChange}></Input>
      </div>
      <textarea placeholder=" 게시글의 내용을 적어주세요. (판매 금지 물품은 게시가 제한될 수 있어요.)" className="TextareaBox" value={postContent} onChange={onTextareaChange}></textarea>
    </TextBox>
  );
}

const TextBox = styled.div`
  & .TextTitleInput {
    display: flex;
    margin-top: 24px;
  }

  & .PriceBox {
    display: flex;
    align-items: center;
    position: relative;

    & span {
      position: absolute;
      left: 40px;
      font-weight: 600;
    }
  }

  & Input {
    font-size: 14px;
    font-weight: 600;
    color: #6c816d;
    border: 2px solid #a5b2a6;
    padding-left: 16px;
    &:focus {
      outline: none;
    }
  }

  & textarea {
    padding: 24px;
    border: 2px solid #a5b2a6;
    &:focus {
      outline: none;
    }
  }

  & .TextTitle {
    width: 1056px;
    height: 40px;
    border-radius: 8px;
  }

  & .TextPrice {
    width: 456px;
    height: 40px;
    border-radius: 8px;
    margin-left: 24px;
    padding-left: 34px;
  }

  & .TextareaBox {
    width: 1056px;
    height: 400px;
    border-radius: 8px;
    margin-top: 24px;
  }
`;