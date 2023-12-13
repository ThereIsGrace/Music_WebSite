import styled from "styled-components";
import {Button} from "@/components/Button/Button";
import {useRecoilState} from "recoil";
import {postContentAtom} from "./boardAtom";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MyModal } from "@/components";
import { titleAtom } from "./boardAtom";
import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";

export function PlaceBox() {
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const [b_id, setB_id] = useState(0);

  useEffect(()=>{
    console.log('비아이디', b_id);
  },[b_id]);
  const onClickBtn = () => {
    if (window.confirm("게시글작성을 취소하시겠습니까? 작성하신 게시물은 저장되지 않습니다.")) {
      navigate(-1);
    }
  };


  const [title] = useRecoilState(titleAtom);
  const [postContent] = useRecoilState(postContentAtom);
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const onSubmit = async (e) => {
    handlePostSubmit();
  };

  function handlePostSubmit(){
    try {
      const uploadData = {
        content: postContent,
        title: title
      };
  
      axiosInstance.post(SERVER_URL + 'board/write', uploadData)
      .then(res => {
        setB_id(res.data.b_id);
        showModal();
        
        window.scrollTo(0, 0);
        
      })
      .catch(error => {
        console.log('error', error)
      })
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } 

  return (
    <SubmitProcessStyle>
      {modalOpen && <MyModal address={`/board/${b_id}`} setModalOpen={setModalOpen} title={"게시물 등록 성공"} content={"게시물 등록에 성공했습니다. board 페이지로 이동하시겠습니까?"} 
      button1text={'취소'} button2text={'확인'}/>}
      <div className="UploadBtnBox">
        <Button className="CancleBtn" onClick={onClickBtn}>
          취소
        </Button>
        <Button className="SubmitBtn" onClick={onSubmit}>
          등록
        </Button>
      </div>
    </SubmitProcessStyle>
  );
}

const SubmitProcessStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 60px;
  

  & .PlaceSearchInputBox {
    position: relative;
  }

  & .PlaceSearchInputBox Input {
    width: 528px;
    height: 40px;
    border: 0;
    border-bottom: 2px solid #a5b2a6;
    color: #393a40;
    padding-left: 12px;
    font-size: 14px;
    font-weight: 600;
  }

  & .PlaceSearchInputBox Button {
    border: 0;
    background-color: #fff;
    color: #6c816d;
    width: 100px;
    position: absolute;
    right: 0px;
    top: 10px;
  }

  & .PlaceSearchInputBox Button .RightArrow {
    fill: #6c816d;
    width: 14px;
    height: 14px;
    vertical-align: middle;
    margin-left: 4px;
  }

  & .UploadBtnBox Button {
    width: 120px;
    height: 40px;
    border-radius: 12px;
    border: 0;
    margin-left: 18px;
    color: #fff;
  }

  & .UploadBtnBox .CancleBtn {
    background-color: #eca997;

    &:hover {
      background-color: #f8e1db;
    }
  }

  & .UploadBtnBox .SubmitBtn {
    background-color: #6c816d;

    &:hover {
      background-color: #a5b2a6;
    }
  }
`;
