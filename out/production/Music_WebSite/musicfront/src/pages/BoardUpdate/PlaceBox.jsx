import styled from "styled-components";
import {Button} from "@/components/Button/Button";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MyModal } from "@/components";
import { SERVER_URL } from "@/constants";
import axiosInstance from "@/axios_interceptor/axios_interceptor";
import { useRecoilValue } from "recoil";
import { updatedContentAtom, updatedTitleAtom } from "./boardUpdateAtoms";

export function PlaceBox() {
  const navigate = useNavigate(); //변수 할당시켜서 사용
  const updatedTitle = useRecoilValue(updatedTitleAtom);
  const updatedContent = useRecoilValue(updatedContentAtom);
  const b_id = window.location.pathname.replace('/board/update/', '');
  const onClickBtn = () => {
    if (window.confirm("게시글작성을 취소하시겠습니까? 작성하신 게시물은 저장되지 않습니다.")) {
      navigate(-1);
    }
  };



  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };

  const onSubmit = async (e) => {
    //e.preventDefault();
    console.log('버튼 클릭됨');

    handlePostSubmit();
  };

  function handlePostSubmit(){
    try {
      const uploadData = {
        content: updatedContent,
        title: updatedTitle
      };
  
      console.log("데이터베이스에 업로드할 데이터: ", uploadData);
      axiosInstance.put(SERVER_URL + 'board/update/' + b_id, uploadData)
      .then(res => {
        showModal();
        
        window.scrollTo(0, 0);
        
      })
      .catch(error => {
        console.log('error', error)
      })
      //moveToAnotherPage("/");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  } 

  return (
    <>
      <SubmitProcessStyle>
        <div className="UploadBtnBox">
          <Button className="CancleBtn" onClick={onClickBtn}>
            취소
          </Button>
          <Button className="SubmitBtn" onClick={onSubmit}>
            수정완료
          </Button>
        </div>
      </SubmitProcessStyle>
      {modalOpen && <MyModal b_id={b_id} setModalOpen={setModalOpen} title={"게시물 등록 성공"} content={"게시물 등록에 성공했습니다."} button1text={"취소"} button2text={"확인"} address={`/board/${b_id}`}/>}
    </>
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
