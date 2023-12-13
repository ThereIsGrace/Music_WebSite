import yellowbubble from "@/assets/Mypage/yellowbubble.svg";
import user01 from "@/assets/Mypage/뽀야미.png";
import user02 from "@/assets/Mypage/미첼.png";
import user03 from "@/assets/Mypage/쭈니.png";
import user04 from "@/assets/Mypage/유네찌.png";
import styled from "styled-components/macro";
import { useEffect, useState } from "react";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { SERVER_URL } from "@/constants";
import { Image } from "@/components";
import exclamationMark from "@/assets/Logo/exclamationmark.png";

export function MypageReview() {
  const [replyList, setReplyList] = useState([]);
  const userReply = () => {
    axiosInstance.get(SERVER_URL + 'my/reply')
    .then(res => {console.log(res, '짱구'); setReplyList(res.data.data)})
    .catch(err => console.log(err));
  }
  useEffect(()=>{
    userReply();
  },[])
  return (
    <BuyReview>
      <div className="ListTitle">
        <span>나에게 달린 댓글들</span>
      </div>
      <div>
        <ul className="reviewList">
          {replyList.map((reply, index) => 
            <li>
              <img src={reply.user.profileImage} alt="유저 이미지" className="userImage"></img>
              <span className="reviewBubble">{reply.content}</span>
            </li>
          )}
          {
            Object.keys(replyList).length === 0 &&
            <>
              <Void style={{marginTop: '90px'}}>
                <Image src={exclamationMark} alt='댓글 없음 이미지'/>
                <p className='void-text' style={{textAlign: 'center'}}>게시물에 달린 댓글이 없습니다.</p>
                <p className='void-text' style={{textAlign: 'center', marginTop: '0px'}}>새로운 게시글을 만들어보세요.</p>
              </Void>
            </>
          }
        </ul>
      </div>
    </BuyReview>
  );
}

const BuyReview = styled.div`
  margin: 60px 0 0 24px;
  .ListTitle {
    width: 396px;
    border-radius: 12px;
  }

  & .userImage {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }

  & div ul {
    padding-top: 16px;
    /* margin-top: 90px; */
  }

  & div ul li {
    width: 396px;
    display: flex;
    margin-top: 18px;
    color: #6c816d;
    font-size: 14px;
  }

  & .reviewBubble {
    display: inline-block;
    width: 330px;
    height: 50px;
    background-image: url(${yellowbubble});
    background-repeat: no-repeat;
    background-size: 100%;
    margin-left: 24px;
    padding-left: 40px;
    line-height: 50px;
  }
`;

const Void = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #6c816d;
  font-weight: 600;
  & img {
    width: 30px;
    margin: 0 auto;
  }

  & .void-text {
    margin: 24px auto 12px;
  }
`
