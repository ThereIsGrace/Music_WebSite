import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { Button } from "@/components";
import { SERVER_URL } from "@/constants";
import styled from "styled-components";
import { Navigate, useNavigate } from 'react-router-dom';


export function BoardButtons() {
    const movePage = useNavigate();
    const location = window.location;
    const pathname = location.pathname;
    const b_id = pathname.replace('/board/', '');
    const updateBoard = () => {
        movePage("/board/update/"+b_id);
    }

    const deleteBoard = () => {
        axiosInstance.get(SERVER_URL + 'board/delete?b_id=' + b_id)
        .then(res => {console.log(res); movePage('/board')})
        .catch(err => console.error(err));
    }
  
  
    return (
      <SubmitProcessStyle>
        <div className="UploadBtnBox">
          <Button className="UpdateBtn" onClick={updateBoard}>
            수정
          </Button>
          <Button className="DeleteBtn" onClick={deleteBoard}>
            삭제
          </Button>
        </div>
      </SubmitProcessStyle>
    );
  }
  
  const SubmitProcessStyle = styled.div`
    display: flex;
    justify-content: center;

    
    & .UploadBtnBox {
        display: flex;
        gap: 10px;
        
    }

    & .UpdateBtn {
        background-color: #5055b1;
        border: none;
        color: #fff;
        font-size: 13px;
        padding: 10px;
        border-radius: 30px;
    }
    
    & .DeleteBtn {
        background-color: rgb(85, 85, 85);
        border: none;
        color: #fff;
        font-size: 13px;
        padding: 10px;
        border-radius: 30px;
    }
  `;