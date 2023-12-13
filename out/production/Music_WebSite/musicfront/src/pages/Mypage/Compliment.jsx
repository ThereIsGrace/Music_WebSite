import raccoon from "@/assets/Mypage/너굴.svg";
import raccoonIcon from "@/assets/Mypage/너굴.png";
import user from "@/assets/Mypage/user.png";
import yellowbubble from "@/assets/Mypage/yellowbubble.svg";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { Image } from "@/components";
import exclamationMark from "@/assets/Logo/exclamationmark.png"
export function Compliment({boardList}) {


  return (
    <SectionCompliment>
      <div className="ListTitle">
        <span>내가 쓴 게시물</span>
      </div>
      <div>
      <img src={raccoon} />
        <ul>
          <p>
            게시물
            <img src={raccoonIcon} alt="너굴아이콘" />
          </p>
          {boardList.map((board, index) => 
          <>
            <li>
              <Link to={`/board/${board.b_id}`} style={{color: 'black'}}>
                <span>{board.title}</span>
              </Link>
              <span>
                <img src={user} alt="유저 이미지" className="userIcon" />
                {board.replyList.length}
              </span>
            </li>
          </>)}
          {
            Object.keys(boardList).length === 0 &&
            <>
              <Void>
                <Image src={exclamationMark} alt='댓글 없음 이미지'/>
                <p className='void-text' style={{textAlign: 'center'}}>아직 게시물이 없습니다.</p>
                <p className='void-text' style={{textAlign: 'center', marginTop: '0px'}}>새로운 게시글을 만들어보세요.</p>
              </Void>
            </>
          }
        </ul>
      </div>
    </SectionCompliment>
  );
}

const SectionCompliment = styled.div`
  margin-top: 60px;
  margin-bottom: 30px;

  .ListTitle {
    width: 396px;
    border-radius: 12px;
  }

  & div > img {
    margin-top: 24px;
  }

  & div {
    display: flex;
    align-items: flex-start;
  }

  & div ul {
    width: 315px;
    height: 340px;
    background-image: url(${yellowbubble});
    background-repeat: no-repeat;
    background-size: 320px 340px;
    margin-top: 24px;
    color: #6c816d;
    padding-left: 17px;
  }

  & div ul p {
    font-weight: 600;
    margin-bottom: 8px;
    margin: 24px 0 12px 24px;
  }

  & div ul p img {
    width: 24px;
    height: 24px;
    margin-left: 4px;
    vertical-align: middle;
  }

  & div ul li {
    font-size: 14px;
    padding: 10px 24px 10px 24px;
    border-bottom: 1px solid #eee7c2;
    display: flex;
    justify-content: space-between;
  }

  & div ul li .userIcon {
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-right: 4px;
  }

  & div ul li:nth-child(8) {
    border: 0;
  }
`;

const Void = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  & img {
    width: 30px;
    margin: 0 auto;
  }

  & .void-text {
    margin: 24px auto 12px;
  }
`
