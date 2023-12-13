import styled from "styled-components";
import {PostItem} from "@/pages/Board";
import {BoardBtn, Responsive} from "@/components";
import {useRecoilState, useRecoilValue} from "recoil";
import {boardAtom} from "./boardAtom";
import {Paging} from "./Paging";
import raccoon from "@/assets/Logo/raccoon.gif";
import { useEffect, useState } from "react";
import { LoginModal } from "@/components/Modal/LoginModal";
import { Cookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export function PostList() {
  const board = useRecoilValue(boardAtom);
  const isLoggedIn = {};
  const movePage = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const loginCheck = () => {
    const cookies = new Cookies();
    let result = cookies.get('ILOGIN') === 'Y';
    if (result) {
      movePage('/board/write');
    }else {
      setModalOpen(true);
    }
  }
  return (
    <PostListBlock>
      {board && board.map((record, index) => <PostItem record={record} id={record.b_id} key={record.b_id} />)}
      
      
      <WritePostButtonWrapper>
        {isLoggedIn && (
          <BoardBtn blue onClick={loginCheck} style={{width: '150px'}}>
            새 글 작성하기
          </BoardBtn>
        )}
      </WritePostButtonWrapper>
      {board.length !== 0 && <Paging />}
      {modalOpen && <LoginModal setModalOpen={setModalOpen} />}
    </PostListBlock>
  );
}

const PostListBlock = styled(Responsive)`
  margin-top: 10em;
  min-height: calc(66vh - 10rem);
`;



const WritePostButtonWrapper = styled.div`
  margin-top: 50px;
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
