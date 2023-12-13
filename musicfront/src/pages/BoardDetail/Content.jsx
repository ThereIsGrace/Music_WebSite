import palette from "@/assets/Styles/palette";
import {Image, Responsive, SubInfo} from "@/components";
import { Avatar, Divider, FormControl, List, ListItem, ListItemAvatar, ListItemText, OutlinedInput, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import exclamationMark from "@/assets/Logo/exclamationmark.png";
import styled from "styled-components";
import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { Cookies } from "react-cookie";
import { BoardButtons } from "./BoardButtons";
import { useNavigate } from "react-router-dom";
import { replyListAtom } from "./boardDetailAtom";
import { useRecoilValue } from "recoil";


export const Content = ({boardId, getReplyList, record}) => {
  const [replyContent, setReplyContent] = useState('');
  const [letterNumber, setLetterNumber] = useState(0); 
  const [loginnedUser, setLoginnedUser] =useState({}); 
  const replyList = useRecoilValue(replyListAtom);
  const [equal, setEqual] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    getUserInfo();
  },[]);

  useEffect(() => {
    if (Object.keys(loginnedUser).length !== 0){
      checkUser();
    }
  },[loginnedUser]);
  const getUserInfo = () => {
    const cookies = new Cookies();
    if (cookies.get('ILOGIN') === 'Y'){
      axiosInstance.get(SERVER_URL + 'user/userInfo')
      .then(res => {setLoginnedUser(res.data.data);})
      .catch();
    }
  }

  useEffect(() => {

  }, [equal])

  const checkUser = () => {
    if (loginnedUser){
      if (loginnedUser.username === record.user.username){
        setEqual(true);
      }
    }
  }
  const letterLength = (e) => {
    setLetterNumber(e.target.value.length);    
  }

  const makeDate = (date) => {
    const day = date.substr(0, 10);
    const time = date.substr(11, 5);
    return day + ' ' + time;
  } 


  const cardBody = () => {
    if (replyList){
      if(Object.keys(replyList).length !== 0){
        return (
          replyList.map((reply, index) => (
          <>
            <Stack spacing={1} >
              <div className='list-tem'>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>
                      <Image src={reply.user.profileImage} alt="댓글 사용자 이미지" style={{width: '50px'}}></Image>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={reply.user.username} secondary={makeDate(reply.regidate)} />
                
                </ListItem>
                <div className="reply-content">
                  <div dangerouslySetInnerHTML={{__html: reply.content}}></div>
                </div>
              </div>
            </Stack>
          </>
          ))    
        );
      }
      if (Object.keys(record.replyList).length === 0){
        return (
          <Void>
            <Image src={exclamationMark} alt='댓글 없음 이미지' />
            <p>댓글이 없습니다. 첫 댓글을 달아보세요.</p>
          </Void>
        )
      }
    }else {
      return (
        <Void>
            <Image src={exclamationMark} alt='댓글 없음 이미지' />
            <p>댓글이 없습니다. 첫 댓글을 달아보세요.</p>
        </Void>
      )
    }
  }

  const formSubmit = (event) => {
    event.preventDefault();
    const location = window.location;
    const pathname = location.pathname;
    const b_id = pathname.replace('/board/', '');
    
    console.log('b_id 번호: ' + b_id);
    
    const data = {
      "content": replyContent, 
      "b_id": b_id
     };
     setReplyContent('');
    axiosInstance.post(SERVER_URL + 'reply/save', data)
    .then(response => { console.log('response', response); getReplyList(); setReplyContent(''); setLetterNumber(0)})
    .catch(error => console.error(error));
    
  }

  const backSpace = () => {
    navigate('/board');
  }

  useEffect(()=>{


  },[replyContent]);


  return (
    <>
      <PostViewerBlock>
      <PostHead>
          <button className='back-space' onClick={backSpace}>게시판으로 돌아가기</button>
          <TitleHead>
            <div className='title'>{record.title}</div>
            {equal && <BoardButtons/>}
          </TitleHead>
          <div className="title-user">
            <Image src={record.user.profileImage} className="user-image"/>
            <div className="title-section">
              <div className="test">
                <SubInfo username={record.user.username} publishedDate={record.updatedate} className="sub-info"/>
              </div> 
            </div>
          </div>
          <div className='hits'>
            <span>조회수 {record.hits}</span>
          </div>
        </PostHead>
        {record && <PostContent dangerouslySetInnerHTML={{__html: record.content}} />}
        
        <div className='reply-input-section'>
          
          <form className='reply' onSubmit={formSubmit}>
            <p className="reply-header">댓글 입력</p>
          <div className='blank'>
            <div className='blank-section'>공백 포함 {letterNumber}자 / 전체 200자</div>
          </div>
          <textarea placeholder="댓글을 작성해주세요(공백 포함 200자 제한)" className="reply-section" name="content"
            maxLength={200} wrap='hard' cols="3" value={replyContent}
            style={{padding: '10px', overflow: 'hidden', resize: 'none', height: '80px'}} onChange={e => {letterLength(e); setReplyContent(e.target.value);}}></textarea>
          <div className="letter-section">
            <button className="reply-button" type='submit' style={{backgroundColor: 'rgb(85, 85, 85)', color: 'white', padding: '10px', border: 'none'}}>댓글작성</button>
          </div>
          </form>
          
        </div>

        <div className='replyList'>
        <div className='replyList-section'>
          <div className="replyList-header">댓글</div>
        </div>
        {cardBody()}
      </div>
      </PostViewerBlock>
    </>
  );
};

const PostViewerBlock = styled(Responsive)`
  margin-top: 10rem;

  & .list-tem {
    border-bottom: 1px solid rgb(221, 221, 221);
  }

  & .reply-button {
    border-radius: 10px;
    width: 150px;
    margin-bottom: 30px;
  }

  & .reply-header {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 7px;
  }

  & .letter-section {
    display: flex;
    justify-content: center;
  }

  & .reply-section{
    margin-top: 10px;
    width: 100%;
    height: 100px;
    padding : 0px;
    margin-bottom: 10px;
  }

  & .blank {
    display: flex;
    justify-content: end;
    border-top: 1px solid rgb(221, 221, 221);
    font-weight: 500;
  }

  & .blank-section {
    margin-top: 20px;
  }

  & .test {
    width: 100%;
  }

  & .title-user {
    display: flex;
    gap: 10px;
    width: 100%;
    align-items: center;
  }

  & .title-section {
    display: flex;
    width: 1000px;
    justify-content: space-between;
    flex-grow: 2;
  }

  & .user-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }

  & .sub-info {
    display: flex;
    justify-content: space-between;
  }

  & .replyList-section {
    border-bottom: 1px solid rgb(221, 221, 221);
  }

  & .replyList {
    width: 100%;
  }

  & .replyList-header {
    font-size: 22px;
    font-weight: 500;
    margin-bottom: 10px;
  }

  & .reply-content {
    padding-left: 16px;
    padding-bottom: 10px;
  }

  & .hits {
    display: flex;
    justify-content: end;
  }

  & .back-space {
    font-size: 12px;
    color: white;
    background-color: rgb(85, 85, 85);
    border: none;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 20px;

    &:hover {
      background-color: #5055b1;
    }
  }
`;


const PostHead = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 1rem;
  margin-bottom: 1rem;


  & .title {
    font-size: 30px;
    /* line-height: 1.5; */
  }

  & .title-user {
    display: flex;
    
    & .sub-info {
      flex-grow: 1;
    }
  }
`;

const PostContent = styled.div`
  font-size: 1.3125rem;
  color: ${palette.gray[8]};
  width: 992px;
  min-height: 500px;
  word-wrap: break-word;

  & img {
  }
`;

const Void = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  & img {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    margin-top: 30px;
  }

  & p {
    margin: 0 auto;
    margin-bottom: 50px;
  }
`;

const TitleHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`



